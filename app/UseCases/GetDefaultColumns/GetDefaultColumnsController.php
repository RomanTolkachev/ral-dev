<?php

namespace App\UseCases\GetDefaultColumns;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class GetDefaultColumnsController extends Controller
{
    public function __invoke(GetDefaultColumnsHandler $handler , GetDefaultColumnsRequest $request): JsonResponse
    {
        $result = $handler->execute(modelName: $request->validated("for"));
        
        return new JsonResponse($result, Response::HTTP_OK);
    }
}
