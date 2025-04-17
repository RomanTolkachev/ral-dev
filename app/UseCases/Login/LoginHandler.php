<?php

namespace App\UseCases\Login;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginHandler
{
    public function __invoke(LoginRequest $request, string $email = "", string $password = ""): array
    {
        // $user = User::where('email', $email)->firstOr(fn () => abort(401, 'access denied'));
        // abort_unless(Hash::check($password, $user->password), 401, 'access denied');
        // $request->session()->regenerate();
        if (Auth::attempt(['email' => $email, 'password' => $password])) {
            $request->session()->regenerate();
        }
        return ['verified'];
    }
}
