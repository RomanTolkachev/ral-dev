<?php

namespace App\UseCases\Permissions\GetModelHasRoles;

use App\Models\User;

class GetModelHasRolesHandler
{
    public function __invoke(string $id)
    {
        $user = User::find($id);
        return $user->getRoleNames()->toArray() ?? [];
    }
}
