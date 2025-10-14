<?php

namespace App\Models\Permissions;

use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Permission\Models\Role as SpatieRole;

class Role extends SpatieRole
{
    protected $connection = 'laravel_services';

    protected $fillable = ['name', 'guard_name'];
}
