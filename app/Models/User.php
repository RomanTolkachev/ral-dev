<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    protected $with = ['userSettings'];

    public function userSettings(): HasMany
    {
        return $this->hasMany(UserSetting::class, 'user_id');
    }

    public static function getDefaultUser()
    {
        return self::find(1);
    }

}
