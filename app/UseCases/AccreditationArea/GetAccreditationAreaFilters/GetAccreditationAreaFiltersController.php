<?php

namespace App\UseCases\AccreditationArea\GetAccreditationAreaFilters;

use Illuminate\Http\JsonResponse;

class GetAccreditationAreaFiltersController
{
    public function __invoke()
    {
        $filters = [
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
                'headerLabel' => 'ralShortInfoView__fullName',
                'type' => 'multiVariants',
                'defaultValue' => []
            ],
            [
                'headerLabel' => 'ralShortInfoView__RegNumber',
                'type' => 'multiVariants',
                'defaultValue' => []
            ]
        ];
        
        return new JsonResponse($filters);
    }
}