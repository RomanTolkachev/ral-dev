<?php

namespace App\UseCases\Ral\GetRalShortInfoFilters;

use App\Models\User;
use App\Services\GetTableSettings;
use App\UseCases\Ral\GetRalShortInfoList\GetRalShortInfoListFilter;

class GetRalShortInfoFiltersHandler
{
    public function execute(User | null $currentUser, User $defaultUser, $query, GetRalShortInfoListFilter $filter)
    {
        $userColumns = GetTableSettings::for($currentUser, $defaultUser, "ral_short_info");

        $availableFilters = $this->availableFilters;

        $filteredColumns = array_filter($availableFilters, function ($value) use ($userColumns) {
            return in_array($value["headerLabel"], $userColumns);
        });

        $resultFilters = array_merge(array_values($filteredColumns), $this->extraFilters);

        return $this->sortByOrder($resultFilters);
    }

    /**
     * Статическое описание доступных фильтров (без динамических значений)
     */
    protected array $availableFilters = [
        [
            'headerLabel' => 'new_status_AL',
            'type' => 'checkBox',
            'defaultValue' => [],
            'values' => [
                'checkboxValues' => [
                    'Частично приостановлен',
                    'Действует',
                    'Архивный',
                    'Приостановлен',
                    'Прекращен'
                ]
            ]
        ],
        [
            'headerLabel' => 'status_change_date',
            'type' => 'date',
            'defaultValue' => ["", ""],
            'values' => [
                'min' => '2024-08-13 10:04:39.110',
                'max' => '2025-08-20 18:09:13.497'
            ]
        ],
        [
            'headerLabel' => 'nameType',
            'type' => 'checkBox',
            'defaultValue' => [],
            'values' => [
                'checkboxValues' => [
                    'ОС по СМ',
                    'ОС органического производства',
                    'ОИ типа B',
                    'МЛ',
                    'ОС',
                    'КЛ',
                    'ОС по персоналу',
                    'ОИ типа A',
                    'ОС процессов и услуг',
                    'ПМСИ',
                    'ИЛ',
                    'ОС по продукции (услугам)',
                    'ОИ типа C',
                    'ОС продукции',
                    'ОВВПГ',
                    'АЛ в ОЕИ',
                    'ОИ'
                ]
            ]
        ],
        [
            'headerLabel' => 'regDate',
            'type' => 'date',
            'defaultValue' => ["", ""],
            'values' => [
                'min' => '1900-03-03 00:00:00.000',
                'max' => '2025-08-20 00:00:00.000'
            ]
        ],
        [
            'headerLabel' => 'NPstatus',
            'type' => 'checkBox',
            'defaultValue' => [],
            'values' => [
                'checkboxValues' => [
                    'Да',
                    'Не применимо',
                    'Нет'
                ]
            ]
        ],
        [
            'headerLabel' => 'NP_status_change_date',
            'type' => 'date',
            'defaultValue' => ["", ""],
            'values' => [
                'min' => '2015-03-12 00:00:00.000',
                'max' => '2025-08-14 10:58:24.520'
            ]
        ],
        [
            'headerLabel' => 'regulations',
            'type' => 'multi',
            'defaultValue' => [],
        ],
        [
            'headerLabel' => 'tnved',
            'type' => 'multi',
            'defaultValue' => [],
        ],
    ];

    protected $extraFilters = [
        [
            'headerLabel' => 'fullText',
            'type' => 'singleText',
            'defaultValue' => '',
            'order' => 1,
        ],
    ];

    private function sortByOrder(array $filters): array
    {
        usort($filters, function ($a, $b) {
            $orderA = $a['order'] ?? PHP_INT_MAX;
            $orderB = $b['order'] ?? PHP_INT_MAX;

            return $orderA <=> $orderB;
        });

        return $filters;
    }
}
