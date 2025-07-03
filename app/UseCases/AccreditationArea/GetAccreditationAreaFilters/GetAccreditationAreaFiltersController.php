<?php

namespace App\UseCases\AccreditationArea\GetAccreditationAreaFilters;

use Illuminate\Http\Request;
use App\Services\TableFilterService;
use Illuminate\Http\JsonResponse;
use App\Models\AccreditationArea;

class GetAccreditationAreaFiltersController
{
    public function __invoke()
    {
        $filters = [
            [
                'header' => "full_gost",
                'headerType' => 'nvarchar',
                'sortValues' => [
                    'type' => 'singleText'
                ],
            ],
            [
                'header' => "tn_ved",
                'headerType' => 'nvarchar',
                'sortValues' => [
                    'type' => 'singleText'
                ],
            ],
            [
                'header' => "source_file_label",
                'headerType' => 'varchar',
                'sortValues' => [
                    'type' => 'checkBox',
                    'checkboxValues' => ["ОА", "РОА", "СОА"]
                ],
            ],
            [
                'header' => "ralShortInfoView__fullName",
                'headerType' => 'varchar',
                'sortValues' => [
                    'type' => 'multi',
                ],
            ],
            [
                'header' => "ralShortInfoView__RegNumber",
                'headerType' => 'varchar',
                'sortValues' => [
                    'type' => 'multi',
                ],
            ],
        ];
        return new JsonResponse($filters);
    }
}
