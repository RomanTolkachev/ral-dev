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
                'headerLabel' => 'ral_short_info_view__fullName',
                'type' => 'multi',
                'defaultValue' => []
            ],
            [
                'headerLabel' => 'ral_short_info_view__RegNumber',
                'type' => 'multi',
                'defaultValue' => []
            ]
        ];
        
        return new JsonResponse($filters);
    }
}