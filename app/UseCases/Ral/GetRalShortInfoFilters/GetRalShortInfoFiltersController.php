<?php

namespace App\UseCases\Ral\GetRalShortInfoFilters;

use App\Models\RalShortInfoView;
use Illuminate\Http\JsonResponse;
use App\Models\User;
use App\UseCases\Ral\GetRalShortInfoList\GetRalShortInfoListFilter;

class GetRalShortInfoFiltersController
{

    public function __invoke(GetRalShortInfoFiltersHandler $handler, GetRalShortInfoFiltersRequest $request): JsonResponse
    {
        $res = $handler->execute(
            currentUser: $request->user(),
            defaultUser: User::getDefaultUser(),
            query: $request->all(),
            filter: new GetRalShortInfoListFilter(new RalShortInfoView(), $request)
        );

        return new JsonResponse($res);
    }
}
