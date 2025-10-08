<?php

namespace App\UseCases\User\GetUser;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class GetUserController extends Controller
{
    public function __invoke(Request $request)
    {
        $user = $request->user();

        $res = [
            'id' => $user->id,
            'email' => $user->email,
            'name' => $user->name,
            'role' => $user->getCachedRole() ?? null,
        ];

        return new JsonResponse($res);
    }
}
