<?php

namespace App\UseCases\User\TableSettings\GetTableSettings;

use Illuminate\Http\JsonResponse;

class GetTableSettingsController
{
    public function __invoke(GetTableSettingsRequest $request, GetTableSettingsHandler $handler): JsonResponse
    {
        return new JsonResponse(call_user_func($handler, $request->query()));
    }
}
