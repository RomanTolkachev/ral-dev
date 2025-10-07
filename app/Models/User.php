<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Cache;

class User extends Authenticatable
{
    public $connection = 'laravel_services';

    public function userSettings(): HasMany
    {
        return $this->hasMany(UserSetting::class, 'user_id');
    }

    public static function getDefaultUser()
    {
        return Cache::remember('defaultUser', 3600, fn () => self::find(1));
    }

    public function getTableSettingsFor(string $for): array
    {
        $cacheKey = "user_{$this->id}_settings_{$for}";

        return Cache::remember($cacheKey, 3600, function () use ($for) {
            $this->loadMissing('userSettings');

            $settings = $this->userSettings
                ->firstWhere('settings_for_table', $for);

            return $settings ? json_decode($settings->settings ?? '[]', true) : [];
        });
    }
}
