<?php

namespace App\UseCases\GetRalShortInfoList;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class GetRalShortInfoListController extends Controller
{
    public function __invoke(GetRalShortInfoListUseCase $useCase, GetRalShortInfoListRequest $request): JsonResponse
    {
        $result = $useCase->execute($request->page, $request->perPage, $request->user_columns);
        
        return new JsonResponse($result, Response::HTTP_OK);
    }
}
