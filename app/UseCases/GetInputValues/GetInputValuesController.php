<?php

namespace App\UseCases\GetInputValues;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GetInputValuesController
{
    public function __invoke(GetInputValuesRequest $request, GetInputValuesHandler $handler): JsonResponse
    {
        return new JsonResponse($handler->execute($request->query()));
    }
}
