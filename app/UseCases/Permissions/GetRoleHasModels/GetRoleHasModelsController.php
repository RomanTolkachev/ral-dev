<?php

namespace App\UseCases\Permissions\GetRoleHasModels;

use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

class GetRoleHasModelsController extends Controller
{
    public function __invoke(GetRoleHasModelsHandler $handler, string $id)
    {
        $roles = call_user_func($handler, $id);
        
        return new JsonResponse($roles);
    }
}
