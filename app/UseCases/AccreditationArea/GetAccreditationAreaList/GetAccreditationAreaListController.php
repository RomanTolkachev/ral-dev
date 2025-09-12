<?php

namespace App\UseCases\AccreditationArea\GetAccreditationAreaList;

use App\Models\AccreditationArea;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use App\Models\User;

class GetAccreditationAreaListController extends Controller
{
    public function __invoke(GetAccrediTationAreaListHandler $handler, GetAccreditationAreaListRequest $request): JsonResponse
    {
        $result = $handler->execute(
            page: $request->page,
            itemsPerPage: $request->perPage,
            user: $request->user(),
            defaultUser: User::getDefaultUser(),
            filter: new GetAccreditationAreaListFilter(new AccreditationArea(), $request)
        );

        return new JsonResponse($result, Response::HTTP_OK);
    }
}
