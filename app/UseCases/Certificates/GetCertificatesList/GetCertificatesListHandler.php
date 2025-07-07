<?php

namespace App\UseCases\Certificates\GetCertificatesList;

use App\Models\CertificatesShortInfo;
use App\Models\DictionaryRegulation;
use App\Services\ConfirmRelationsService;
use Illuminate\Support\Str;


class GetCertificatesListHandler
{
    public function __construct(protected GetCertificatesListFilter $filter, protected ConfirmRelationsService $relations)
    {
    }

    public function execute(int $page, int $itemsPerPage, array $columns): GetCertificatesListResource
    {

        $query = CertificatesShortInfo::with(["ralShortInfoView", "certificateApplicant", 'certificationAuthority', "statusChange"]);

        $regulationsMap = DictionaryRegulation::pluck('values_reg')->toArray();

        // dd($regulationsMap);

        $result = $query->filter(
            $this->filter
        )
            ->paginate(
                page: $page,
                perPage: $itemsPerPage
            );

        $result->getCollection()->transform(function ($certificate) use ($regulationsMap) {
            if ($certificate->technicalReglaments) {
                $certificate->technicalReglaments = $this->replaceRegulations(
                    $certificate->technicalReglaments,
                    $regulationsMap
                );
            }
            return $certificate;
        });

        return new GetCertificatesListResource($result);
    }


    protected function replaceRegulations(string $regulations, array $regulationsMap): string
    {
        if (empty($regulationsMap)) {
            return $regulations;
        }

        // Нормализуем строки для поиска
        $normalize = function ($str) {
            // Удаляем все пробелы и приводим к нижнему регистру
            return mb_strtolower(preg_replace('/\s+/u', '', $str));
        };

        // Подготовка карты для поиска
        $searchMap = [];
        foreach ($regulationsMap as $fullText) {
            // Основной вариант (полный текст)
            $searchMap[$normalize($fullText)] = $fullText;

            // Вариант без номера (ТР ТС XXX/XXXX)
            $withoutNumber = preg_replace('/^ТР (ТС|ЕАЭС) \d+\/\d+\s*/u', '', $fullText);
            $searchMap[$normalize($withoutNumber)] = $fullText;

            // Вариант только с "О безопасности..."
            if (Str::contains($fullText, 'О безопасности')) {
                $safetyPart = explode('О безопасности', $fullText)[1];
                $searchMap[$normalize('О безопасности' . $safetyPart)] = $fullText;
            }
        }

        return collect(explode(';', $regulations))
            ->map(function ($item) use ($searchMap, $normalize) {
                $original = trim($item);
                $normalized = $normalize($original);

                // 1. Проверка полного совпадения
                if (isset($searchMap[$normalized])) {
                    return $searchMap[$normalized];
                }

                // 2. Проверка частичного совпадения
                foreach ($searchMap as $normalizedPattern => $fullText) {
                    if (Str::contains($normalized, $normalizedPattern)) {
                        return $fullText;
                    }
                }

                return $original; // Если не нашли совпадение
            })
            ->filter()
            ->implode('; ');
    }
}
