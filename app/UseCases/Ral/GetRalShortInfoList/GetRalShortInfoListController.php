<?php

namespace App\UseCases\Ral\GetRalShortInfoList;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use App\Models\User;
use App\Models\RalShortInfoView;

class GetRalShortInfoListController extends Controller
{
    public function __invoke(GetRalShortInfoListHandler $handler, GetRalShortInfoListRequest $request): JsonResponse
    {
        $result = $handler->execute(
            page: $request->page,
            itemsPerPage: $request->perPage,
            user: $request->user(),
            defaultUser: User::getDefaultUser(),
            filter: new GetRalShortInfoListFilter(new RalShortInfoView(), $request)
        );

        return new JsonResponse($result, Response::HTTP_OK);
    }
}
