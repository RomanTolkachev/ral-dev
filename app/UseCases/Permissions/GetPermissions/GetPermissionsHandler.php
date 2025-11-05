<?php

namespace App\UseCases\Permissions\GetPermissions;

use App\Models\Permissions\Permission;
use Illuminate\Http\JsonResponse;

class GetPermissionsHandler
{
    public function __invoke()
    {
        $permissions = Permission::query()->select("id", "name")
            ->get()->toArray();
        return new JsonResponse($permissions);
    }
}
