<?php

namespace App\UseCases\Login;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class LoginHandler
{
    public function __invoke(LoginRequest $request, string $email = "", string $password = ""): array
    {
        
        if (Auth::attempt(['email' => $email, 'password' => $password])) {
            return [$request->user()->only('id', 'name', 'email')];
        } 

        throw ValidationException::withMessages([
            'Неверный email или пароль.',
        ]);
       
    }
}
