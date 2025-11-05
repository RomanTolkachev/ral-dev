<?php

namespace App\UseCases\AccreditationArea\GetAccreditationAreaFilters;

use Illuminate\Http\JsonResponse;
use App\Models\User;
use App\UseCases\AccreditationArea\GetAccreditationAreaList\GetAccreditationAreaListFilter;
use App\Models\AccreditationArea; 

class GetAccreditationAreaFiltersController
{
    public function __invoke(GetAccreditationAreaFiltersHandler $handler, GetAccreditationAreaFiltersRequest $request)
    {
        $res = $handler->execute(
            currentUser: $request->user(),
            defaultUser: User::getDefaultUser(),
            query: $request->all(),
            filter: new GetAccreditationAreaListFilter(new AccreditationArea(), $request)
        );

        return new JsonResponse($res);
    }
}
