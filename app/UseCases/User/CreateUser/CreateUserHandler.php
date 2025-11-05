<?php

namespace App\UseCases\User\CreateUser;

use Illuminate\Support\Facades\Hash;
use App\Models\User;

class CreateUserHandler
{
    public function __invoke(array $data): array
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        return [
            'user' => $user->only('id', "name", "email"),
            'message' => 'User created successfully',
        ];
    }
}
