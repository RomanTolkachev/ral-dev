<?php

namespace App\UseCases\User\DeleteUser;

use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

class DeleteUserController extends Controller
{
    public function __invoke(DeleteUserRequest $request, DeleteUserHandler $handler)
    {
        return new JsonResponse(call_user_func($handler, $request->validated()));
    }
}
