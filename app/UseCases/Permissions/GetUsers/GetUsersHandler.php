<?php

namespace App\UseCases\Permissions\GetUsers;

use App\Models\User;
use Illuminate\Http\JsonResponse;

class GetUsersHandler
{
    public function __invoke()
    {
        $users = User::with('roles')
            ->whereNull('deleted_at')
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'roles' => $user->getRoleNames()->toArray()
                ];
            })
            ->toArray();

        return new JsonResponse($users);
    }
}
