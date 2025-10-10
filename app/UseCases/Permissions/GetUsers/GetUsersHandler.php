<?php

namespace App\UseCases\Permissions\GetUsers;

use App\Models\User;
use Illuminate\Http\JsonResponse;

class GetUsersHandler
{
    public function __invoke()
    {
        $users = User::query()->select("users.id", "users.name", "users.email", "roles.name as role")
            ->leftJoin('model_has_roles', 'users.id', '=', 'model_has_roles.model_id')
            ->leftJoin('roles', 'roles.id', '=', 'model_has_roles.role_id')
            ->get()->toArray();
        return new JsonResponse($users);
    }
}
