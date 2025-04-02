<?php

namespace App\Http\Controllers;

use App\Models\RalShortInfoView;
use App\Services\TableFilterService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GetFiltersController
{

    public function __invoke(TableFilterService $tableFilterService, Request $request): JsonResponse
    {
        $filters = $tableFilterService->getFiltersFor(RalShortInfoView::class, $request->userFilters);
        return new JsonResponse($filters);
    }
}
