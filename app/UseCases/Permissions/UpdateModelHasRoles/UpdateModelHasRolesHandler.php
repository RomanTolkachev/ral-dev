<?php

namespace App\UseCases\Permissions\UpdateModelHasRoles;

use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Exception;

class UpdateModelHasRolesHandler
{
    public function __invoke(array $validated)
    {

        $user = User::find($validated["userId"]);
        if (!$user) {
            throw new ModelNotFoundException("User with id {$validated['userId']} not found");
        }
        try {
            $user->syncRoles($validated["newRoles"]);

            return "Roles assigned successfully";
        } catch (Exception $e) {
            throw new Exception("Failed to assign roles: " . $e->getMessage());
        }
    }
}
