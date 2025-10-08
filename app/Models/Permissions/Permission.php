<?php

namespace App\Models\Permissions;

use Spatie\Permission\Models\Permission as SpatiePermission;

class Permission extends SpatiePermission
{
    protected $connection = 'laravel_services';
}