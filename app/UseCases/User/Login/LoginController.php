<?php

namespace App\UseCases\User\Login;

use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

class LoginController extends Controller
{
    public function __invoke(LoginRequest $request, LoginHandler $handler)
    {
        return new JsonResponse(call_user_func($handler, $request, $request->email, $request->password));
    }
}
