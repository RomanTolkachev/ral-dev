<?php

namespace App\Http\Controllers;

use App\Models\RalShortInfoMock;
use App\Services\TableFilterService;
use Illuminate\Http\JsonResponse;

class GetFiltersController
{

    public function __invoke(TableFilterService $tableFilterService): JsonResponse
    {
        $filters = $tableFilterService->getFiltersFor(RalShortInfoMock::class);

        return new JsonResponse($filters);
    }
}
