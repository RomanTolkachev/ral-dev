<?php

namespace App\UseCases\Permissions\GetRoleHasModels;

use App\Models\Permissions\Role;

class GetRoleHasModelsHandler
{
    public function __invoke(string $id)
    {
        $role = Role::find($id);
        return $role->users->pluck("id")->toArray() ?? [];
    }
}
