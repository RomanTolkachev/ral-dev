<?php

namespace App\UseCases\GetAvailableColumns;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class GetAvailableColumnsController extends Controller
{
    public function __invoke(GetAvailableColumnsHandler $handler , GetAvailableColumnsRequest $request): JsonResponse
    {
        $result = $handler->execute(modelName: $request->validated("for"));
        
        return new JsonResponse($result, Response::HTTP_OK);
    }
}
