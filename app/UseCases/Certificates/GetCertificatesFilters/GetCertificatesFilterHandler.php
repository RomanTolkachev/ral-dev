<?php

namespace App\UseCases\Certificates\GetCertificatesFilters;

use App\Models\User;
use App\Services\GetTableSettings;
use App\UseCases\Certificates\shared\GetCertificatesFilter;
use App\Models\CertificatesShortInfo;

class GetCertificatesFilterHandler
{

    public function execute(User | null $currentUser, User $defaultUser, $query, GetCertificatesFilter $filter)
    {
        $requestedColumns = GetTableSettings::for($currentUser, $defaultUser, "certificates_short_info");

        $filters = $this->availableFilters;

        // Подставляем динамические значения
        foreach ($filters as &$filterItem) {
            if ($filterItem['headerLabel'] === 'technicalReglaments') {
                $filterItem['values']['checkboxValues'] = $this->getTechReglamentCodes($filter);
            }
            if ($filterItem['headerLabel'] === 'certificate_status') {
                $filterItem['values']['checkboxValues'] = $this->getCertificateStatuses($filter);
            }
        }

        // Фильтруем доступные фильтры по пользовательским настройкам
        $handledColumns = array_filter($filters, function ($value) use ($requestedColumns) {
            return in_array($value["headerLabel"], $requestedColumns);
        });

        return array_values($handledColumns);
    }

    protected function getCertificateStatuses(GetCertificatesFilter $filter): array
    {
        $label = 'certificate_status';
        $originalFilters = $filter->getInputs()[$label] ?? [];

        // Клонируем фильтр чтобы не менять оригинал
        $statusFilter = clone $filter;

        // Применяем ВСЕ фильтры КРОМЕ статуса
        $query = CertificatesShortInfo::with(["ralShortInfoView", "certificateApplicant", 'certificationAuthority', "statusChange"]);
        $filteredQuery = $statusFilter->apply($query, exclude: [$label]);

        // Получаем только статусы отфильтрованных записей
        $res = $filteredQuery->distinct()
            ->pluck('certificate_status')
            ->toArray();

        return array_values(array_unique(array_merge($originalFilters, $res)));
    }

    protected function getTechReglamentCodes(GetCertificatesFilter $filter): array
    {
        $label = 'technicalReglaments';
        $originalFilters = $filter->getInputs()[$label] ?? [];

        // Клонируем фильтр чтобы не менять оригинал
        $techRegFilter = clone $filter;

        // Применяем ВСЕ фильтры КРОМЕ техрегламентов
        $query = CertificatesShortInfo::with(["ralShortInfoView", "certificateApplicant", 'certificationAuthority', "statusChange"]);
        $filteredQuery = $techRegFilter->apply($query, exclude: [$label]);

        // Получаем только техрегламенты отфильтрованных записей
        $res = $filteredQuery->join('certificate_tech_reglaments_link', 'certificates_short_info.id', '=', 'certificate_tech_reglaments_link.certificate_id')
            ->join('dictionary_regulations', 'certificate_tech_reglaments_link.tech_reg_id', '=', 'dictionary_regulations.id')
            ->distinct()
            ->pluck('dictionary_regulations.tech_reg_code')
            ->toArray();

        return array_values(array_unique(array_merge($originalFilters, $res)));
    }


    /**
     * Статическое описание доступных фильтров (без динамических значений)
     */
    protected array $availableFilters = [
        [
            'headerLabel' => "ral_short_info_view__RegNumber",
            'type' => 'multi',
            'defaultValue' => [],
        ],
        [
            'headerLabel' => "technicalReglaments",
            'type' => 'multiVariants',
            'defaultValue' => [],
            'values' => [
                'checkboxValues' => [], // будет подставлено в execute()
            ],
        ],
        [
            'headerLabel' => "certificate_name",
            'type' => 'multi',
            'defaultValue' => [],
        ],
        [
            'headerLabel' => "certificate_status",
            'type' => 'checkBox',
            'defaultValue' => [],
            'values' => [
                'checkboxValues' => ["Приостановлен", "Прекращён", "Действует", "Продлен", "Недействителен", "Архивный"]
            ],
        ],
        [
            'headerLabel' => "status_change__status_changes_by",
            'type' => 'checkBox',
            'defaultValue' => [],
            'values' => [
                'checkboxValues' => [
                    "По решению органа по сертификации",
                    "По решению национального органа по аккредитации",
                    "None"
                ]
            ],
        ],
        [
            'headerLabel' => "update_status_date",
            'type' => 'date',
            'defaultValue' => ["", ""],
        ],
        [
            'headerLabel' => "date",
            'type' => 'date',
            'defaultValue' => ["", ""],
        ],
        [
            'headerLabel' => "endDate",
            'type' => 'date',
            'defaultValue' => ["", ""],
        ],
        [
            'headerLabel' => "expertFio",
            'type' => 'multi',
            'defaultValue' => [],
        ],
        [
            'headerLabel' => "custom_certification_authority",
            'type' => 'multi',
            'defaultValue' => [],
        ],
        [
            'headerLabel' => "ral_short_info_view__custom_number",
            'type' => 'multi',
            'defaultValue' => [],
        ],
        [
            'headerLabel' => "certificate_applicant__inn",
            'type' => 'multi',
            'defaultValue' => [],
        ],
        [
            'headerLabel' => "certificate_applicant__ogrn",
            'type' => 'multi',
            'defaultValue' => [],
        ],
        [
            'headerLabel' => "certificate_applicant__fullName",
            'type' => 'multi',
            'defaultValue' => [],
        ],
    ];

    private $techicalReglamentsCheckboxValues = [
        "ТР ТС 001/2011",
        "ТР ТС 025/2012",
        "ТР ТС 028/2012",
        "ТР ТС 018/2011",
        "ТР ТС 014/2011",
        "ТР ТС 010/2011",
        "ТР ТС 031/2012",
        "ТР ТС 032/2013",
        "ТР ТС 012/2011",
        "ТР ТС 019/2011",
        "ТР ЕАЭС 043/2017",
        "ТР ЕАЭС 050/2021",
        "ТР ТС 006/2011",
        "ТР ТС 003/2011",
        "ТР ТС 016/2011",
        "ТР ТС 011/2011",
        "ТР ТС 021/2011",
        "ТР ТС 034/2013",
        "ТР ТС 013/2011",
        "ТР ТС 004/2011",
        "ТР ТС 002/2011",
        "ТР ТС 020/2011",
        "ТР ЕАЭС 040/2016",
        "ТР ТС 015/2011",
        "ТР ЕАЭС 045/2017",
        "ТР ТС 023/2011",
        "ТР ЕАЭС 037/2016",
        "ТР ТС 030/2012",
        "ТР ТС 017/2011",
        "ТР ТС 008/2011",
        "ТР ТС 009/2011",
        "ТР ТС 007/2011",
        "ТР ЕАЭС 042/2017",
        "ТР ТС 024/2011",
        "ТР ЕАЭС 046/2018",
        "ТР ЕАЭС 047/2018",
        "ТР ТС 005/2011",
        "ТР ЕАЭС 038/2016",
        "ТР ТС 022/2011",
        "ТР ТС 033/2013",
        "ТР ТС 029/2012",
        "ТР ЕАЭС 051/2021",
        "ТР ЕАЭС 044/2017",
        "ТР ЕАЭС 036/2016",
        "ТР ТС 027/2012",
        "ТР ТС 035/2014",
        "ТР ТС 026/2012",
        "ТР ЕАЭС 039/2016",
        "ТР ЕАЭС 041/2017",
        "ТР ЕАЭС 037/2016"
    ];
}
