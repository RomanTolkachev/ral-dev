<?php

namespace App\UseCases\User\DeleteRole;

use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

class DeleteRoleController extends Controller
{
    public function __invoke($id, DeleteRoleHandler $handler)
    {
        return new JsonResponse(call_user_func($handler, $id));
    }
}
