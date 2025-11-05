<?php

namespace App\UseCases\Permissions\GetModelHasRoles;

use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

class GetModelHasRolesController extends Controller
{
    public function __invoke(GetModelHasRolesHandler $handler, string $id)
    {
        $roles = call_user_func($handler, $id);
        
        return new JsonResponse($roles);
    }
}
