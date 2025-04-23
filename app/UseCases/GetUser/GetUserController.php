<?php

namespace App\UseCases\GetUser;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class GetUserController extends Controller
{
    public function __invoke(Request $request)
    {
        return $request->user()->only('id', "email", "name");
    }
}
