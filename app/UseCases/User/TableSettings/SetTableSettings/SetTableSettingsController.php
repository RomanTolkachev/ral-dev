<?php

namespace App\UseCases\User\TableSettings\SetTableSettings;

use Illuminate\Http\JsonResponse;

class SetTableSettingsController
{
    public function __invoke(SetTableSettingsRequest $request, SetTableSettingsHandler $handler): JsonResponse
    {
        $request = $request->merge(['user_id' => $request->user()?->id]);
        return new JsonResponse(call_user_func($handler, $request->all()));
    }
}
