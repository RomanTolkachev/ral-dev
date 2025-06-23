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
                    'type' => 'huge'
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
            // [
            //     'header' => "source_file_label",
            //     'headerType' => 'varchar',
            //     'sortValues' => [
            //         'type' => 'checkBox',
            //         'checkboxValues' => ["ОА", "РОА", "СОА"]
            //     ],
            // ],
            // [
            //     'header' => "ralShortInfoView__fullName",
            //     'headerType' => 'varchar',
            //     'sortValues' => [
            //         'type' => 'huge',
            //     ],
            // ],
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
