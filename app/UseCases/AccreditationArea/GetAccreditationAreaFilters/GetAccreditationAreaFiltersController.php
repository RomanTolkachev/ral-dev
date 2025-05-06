<?php

namespace App\UseCases\AccreditationArea\GetAccreditationAreaFilters;

use Illuminate\Http\Request;
use App\Services\TableFilterService;
use Illuminate\Http\JsonResponse;
use App\Models\AccreditationArea;

class GetAccreditationAreaFiltersController
{
    public function __invoke(TableFilterService $tableFilterService, Request $request)
    {
        $filters = $tableFilterService->getFiltersFor(AccreditationArea::class, $request->userFilters ?? []);
        $filters = [
            [
                'header' => "gost",
                'headerType' => 'nvarchar',
                'sortValues' => [
                    'type' => 'huge'
                ],
            ],
            [
                'header' => "tn_ved",
                'headerType' => 'nvarchar',
                'sortValues' => [
                    'type' => 'huge'
                ],
            ],
        ];
        return new JsonResponse($filters);
    }
}
