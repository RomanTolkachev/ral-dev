<?php

namespace App\UseCases\Ral\GetRalShortInfoFilters;

use Illuminate\Http\JsonResponse;

class GetRalShortInfoFiltersController
{

    public function __invoke(): JsonResponse
    {
        $filters = [
            [
                'headerLabel' => 'fullText',
                'type' => 'singleText',
                'defaultValue' => '',
            ],
            [
                'headerLabel' => 'new_status_AL',
                'type' => 'checkBox',
                'defaultValue' => ["", ""],
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
                'headerLabel' => 'regulation',
                'type' => 'multi',
                'defaultValue' => [],
            ],
            [
                'headerLabel' => 'tnved',
                'type' => 'multi',
                'defaultValue' => [],
            ],
            [
                'headerLabel' => 'fullText',
                'type' => 'singleText',
                'defaultValue' => '',
            ],
            [
                'headerLabel' => 'regulation',
                'type' => 'multi',
                'defaultValue' => [],
            ],
            [
                'headerLabel' => 'tnved',
                'type' => 'multi',
                'defaultValue' => [],
            ]
        ];

        return new JsonResponse($filters);
    }
}
