<?php

namespace App\UseCases\Permissions\GetRoles;
use Illuminate\Routing\Controller;

class GetRolesController extends Controller
{
    public function __invoke(GetRolesHandler $handler)
    {
        return call_user_func($handler);
    }
}