<?php

namespace App\UseCases\Certificates\GetCertificatesFilters;

use Illuminate\Foundation\Http\FormRequest;
use Carbon\Carbon;

/**
 * @method array all() Получить все query параметры
 * @method mixed user() Получить пользователя
 * @method mixed query() Получить пользователя
 * @method mixed merge() Получить пользователя
 */
class GetCertificatesFiltersRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    protected array $columnsToFormatDates = ['update_status_date', 'date', 'endDate'];
    protected function formatToIsoZolo($rawDate): string | null
    {
        return  $rawDate === null ? null : Carbon::parse($rawDate)->toIso8601ZuluString();
    }
    protected function formatToIsoZoloEnd($rawDate): string | null
    {
        return  $rawDate === null ? null : Carbon::parse($rawDate)->endOfDay()->toIso8601ZuluString();
    }

    public function rules(): array
    {
        return [];
    }

    public function after(): array
    {
        return [
            function () {
                $queries = $this->query();

                foreach ($queries as $key => $query) {

                    if ($query === null) {
                        continue;
                    }

                    if (is_array($query)) {
                        foreach ($query as $index => $item) {

                            if ($item === null) {
                                continue;
                            }

                            if (in_array($key, $this->columnsToFormatDates)) {
                                if ($index === 1) {
                                    $query[$index] = $this->formatToIsoZoloEnd($item);
                                } else {
                                    $query[$index] = $this->formatToIsoZolo($item);
                                }
                            }
                        }

                        $this->merge([$key => $query]);
                    }
                }
            }
        ];
    }
}
