<?php

namespace App\UseCases\User\CreateRole;

use App\Models\Permissions\Role;

/**
 * @method static Role create(array $attributes = [])
 */ 
class CreateRoleHandler
{
    public function __invoke(array $data): array
    {
        $role = Role::create([
            'name' => $data['role_name'],
            'guard_name' => 'web'
        ]);

        return [
            'role' => $role->only('id', "name"),
            'message' => 'Role created successfully',
        ];
    }
}
