<?php

namespace App\UseCases\Certificates\GetCertificatesFilters;

use Illuminate\Http\Request;
use App\Services\TableFilterService;
use Illuminate\Http\JsonResponse;
use App\Models\AccreditationArea;

class GetCertificatesFiltersController
{
    public function __invoke()
    {
        $filters = [
            [
                'header' => "certificate_name",
                'headerType' => 'nvarchar',
                'sortValues' => [
                    'type' => 'multi'
                ],
            ],
            [
                'header' => "certificate_status",
                'headerType' => 'nvarchar',
                'sortValues' => [
                    'type' => 'checkBox',
                    'checkboxValues' => ["Приостановлен", "Прекращён", "Действует", "Продлен", "Недействителен", "Архивный"]
                ],
            ],
            [
                'header' => "status_change__status_changes_by",
                'headerType' => 'nvarchar',
                'sortValues' => [
                    'type' => 'checkBox',
                    'checkboxValues' => [
                        "По решению органа по сертификации", 
                        "По решению национального органа по аккредитации",
                        "None"
                    ]
                ],
            ],
            [
                'header' => "update_status_date",
                'headerType' => 'varchar',
                'sortValues' => [
                    'type' => 'date',
                ],
            ],
            [
                'header' => "date",
                'headerType' => 'datetime',
                'sortValues' => [
                    'type' => 'date',
                ],
            ],
            [
                'header' => "endDate",
                'headerType' => 'datetime',
                'sortValues' => [
                    'type' => 'date',
                ],
            ],
            // [
            //     'header' => "ralShortInfoView__RegNumber",
            //     'headerType' => 'varchar',
            //     'sortValues' => [
            //         'type' => 'huge',
            //     ],
            // ],
        ];
        return new JsonResponse($filters);
    }
}
