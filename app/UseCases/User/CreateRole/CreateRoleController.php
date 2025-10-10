<?php

namespace App\UseCases\User\CreateRole;

use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

class CreateRoleController extends Controller
{
    public function __invoke(CreateRoleRequest $request, CreateRoleHandler $handler)
    {
        return new JsonResponse(call_user_func($handler, $request->validated()));
    }
}
