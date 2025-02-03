<?php

namespace App\Http\Controllers;

use App\Models\RalShortInfoMock;
use App\Services\TableFilterService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GetFiltersController
{

    public function __invoke(TableFilterService $tableFilterService, Request $request): JsonResponse
    {
        $filters = $tableFilterService->getFiltersFor(RalShortInfoMock::class, $request->userFilters);
        return new JsonResponse($filters);
    }
}
