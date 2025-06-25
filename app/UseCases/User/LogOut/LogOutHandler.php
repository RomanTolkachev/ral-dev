<?php

namespace App\UseCases\User\LogOut;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

class LogOutHandler
{
    public function __invoke($request): void
    {
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        Cookie::queue(Cookie::forget('laravel_session'));
        Cookie::queue(Cookie::forget('XSRF-TOKEN'));
    }    
}