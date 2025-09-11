<?php

namespace App\UseCases\AccreditationArea\GetAccreditationAreaFilters;

use App\Models\User;
use App\Services\GetTableSettings;
use App\UseCases\AccreditationArea\GetAccreditationAreaList\GetAccreditationAreaListFilter;


class GetAccreditationAreaFiltersHandler
{

    public function execute(User | null $currentUser, User $defaultUser, $query, GetAccreditationAreaListFilter $filter)
    {
        $requestedColumns = GetTableSettings::for($currentUser, $defaultUser, "accreditation_area");

        $filters = $this->availableFilters;

        // dd($requestedColumns);

        // Фильтруем доступные фильтры по пользовательским настройкам
        $handledColumns = array_filter($filters, function ($value) use ($requestedColumns) {
            return in_array($value["headerLabel"], $requestedColumns);
        });

        return array_values($handledColumns);
    }


    /**
     * Статическое описание доступных фильтров (без динамических значений)
     */
    protected array $availableFilters = [
        [
            'headerLabel' => 'full_gost',
            'type' => 'singleText',
            'defaultValue' => ''
        ],
        [
            'headerLabel' => 'tn_ved',
            'type' => 'singleText',
            'defaultValue' => ''
        ],
        [
            'headerLabel' => 'source_file_label',
            'type' => 'checkBox',
            'defaultValue' => [],
            'values' => [
                'checkboxValues' => ['УОА', 'РОА', 'СОА']
            ]
        ],
        [
            'headerLabel' => 'ral_short_info_view__fullName',
            'type' => 'multi',
            'defaultValue' => []
        ],
        [
            'headerLabel' => 'ral_short_info_view__custom_number',
            'type' => 'multi',
            'defaultValue' => []
        ]
    ];
}
