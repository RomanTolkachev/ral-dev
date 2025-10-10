<?php

namespace App\UseCases\Permissions\GetPermissions;
use Illuminate\Routing\Controller;

class GetPermissionsController extends Controller
{
    public function __invoke(GetPermissionsHandler $handler)
    {
        return call_user_func($handler);
    }
}