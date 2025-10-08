<?php

namespace App\Models\Permissions;

use Spatie\Permission\Models\Role as SpatieRole;

class Role extends SpatieRole
{
    protected $connection = 'laravel_services';
}