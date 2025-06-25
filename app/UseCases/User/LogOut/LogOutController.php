<?php

namespace App\UseCases\User\LogOut;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LogOutController
{
    public function __invoke(Request $request, LogOutHandler $logout): JsonResponse
    {
        $logout($request);
        return new JsonResponse(['message' => 'Logged out']);
    }
}
