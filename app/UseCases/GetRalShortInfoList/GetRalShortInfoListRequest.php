<?php

namespace App\UseCases\GetRalShortInfoList;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

/**
 * @property-read integer $page
 * @property-read integer $perPage
 * @property-read array $user_columns
 */
class GetRalShortInfoListRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected array $columnsToFormatDates = ['status_change_date', 'regDate', 'NP_status_change_date'];
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
        return [
            'page' => ['required', 'integer', 'between:1,500'],
            'perPage' => ['required', 'integer', 'between:1,500'],
            'user_columns' => ['required', 'array', 'min:1'],
            'user_columns.*' => ['required', 'string']
        ];
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

                            // Если значение столбца находится в $this->columnsToFormatDates
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
