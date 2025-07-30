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
                'header' => "ral_short_info_view__RegNumber",
                'headerType' => 'nvarchar',
                'sortValues' => [
                    'type' => 'multi',
                ],
            ],
            [
                'header' => "technicalReglaments",
                'headerType' => 'nvarchar',
                'sortValues' => [
                    'type' => 'multiVariants',
                ],
            ],
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

        ];
        return new JsonResponse($filters);
    }
}
