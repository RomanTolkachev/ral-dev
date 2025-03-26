<?php

namespace App\Http\Controllers;

use App\Models\RalShortInfo;
use App\Services\TableFilterService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GetFiltersController
{

    public function __invoke(TableFilterService $tableFilterService, Request $request): JsonResponse
    {
        $filters = $tableFilterService->getFiltersFor(RalShortInfo::class, $request->userFilters);
        return new JsonResponse($filters);
    }
}
