<?php

namespace App\UseCases\User\DeleteRole;

use App\Models\Permissions\Role;

/**
 * @method static Role create(array $attributes = [])
 */
class DeleteRoleHandler
{
    public function __invoke(int $id): array
    {
        $role = Role::find($id);

        if (! $role) {
            return ['message' => 'Role not found'];
        }

        $role->delete();

        return [
            'role' => $role->only('id', 'name', 'deleted_at'),
            'message' => 'Role deleted successfully',
        ];
    }
}
