<?php

namespace App\UseCases\Permissions\GetRoles;

use App\Models\Permissions\Role;
use Illuminate\Http\JsonResponse;

class GetRolesHandler
{
    public function __invoke()
    {
        $users = Role::query()->select("name", "id")
            ->get()->toArray();
        return new JsonResponse($users);
    }
}
