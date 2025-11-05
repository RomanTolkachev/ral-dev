<?php

namespace App\UseCases\User\DeleteUser;

use App\Models\User;

class DeleteUserHandler
{
    public function __invoke(array $data): array
    {
        $user = User::find($data['id']);

        if (! $user) {
            return ['message' => 'User not found'];
        }

        $user->delete();

        return [
            'user' => $user->only('id', 'name', 'email', 'deleted_at'),
            'message' => 'Ok',
        ];
    }
}
