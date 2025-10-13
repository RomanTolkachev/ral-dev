<?php

namespace App\Models\Permissions;

use Spatie\Permission\Models\Role as SpatieRole;

class Role extends SpatieRole
{
    protected $connection = 'laravel_services';

    protected $fillable = ['name', 'guard_name'];

    protected function serializeDate(\DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s.v');
    }
}
