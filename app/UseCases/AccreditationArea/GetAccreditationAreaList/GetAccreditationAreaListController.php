<?php

namespace App\UseCases\AccreditationArea\GetAccreditationAreaList;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class GetAccreditationAreaListController extends Controller
{
    public function __invoke(GetAccrediTationAreaListHandler $handler, GetAccreditationAreaListRequest $request): JsonResponse
    {
        $result = $handler->execute(
            $request->page, 
            $request->perPage, 
            $request->user_columns, 
            $request->gost ?? [], 
            $request->tn_ved ?? []
        );
        
        return new JsonResponse($result, Response::HTTP_OK);
    }
}
