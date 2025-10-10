<?php

namespace App\UseCases\User\CreateUser;

use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

class CreateUserController extends Controller
{
    public function __invoke(CreateUserRequest $request, CreateUserHandler $handler)
    {
        return new JsonResponse(call_user_func($handler, $request->validated()));
    }
}
