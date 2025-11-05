<?php

namespace App\UseCases\Permissions\GetUsers;
use Illuminate\Routing\Controller;

class GetUsersController extends Controller
{
    public function __invoke(GetUsersHandler $handler)
    {
        return call_user_func($handler);
    }
}