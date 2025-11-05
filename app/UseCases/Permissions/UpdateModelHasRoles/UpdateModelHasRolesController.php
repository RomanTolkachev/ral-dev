<?php 

namespace App\UseCases\Permissions\UpdateModelHasRoles;

use Illuminate\Http\JsonResponse;

class UpdateModelHasRolesController
{
    public function __invoke(UpdateModelHasRolesRequest $request, UpdateModelHasRolesHandler $handler) {
        $res = call_user_func($handler, $request->validated());

        return new JsonResponse($res);
    }
}