<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Cache;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasRoles {
        assignRole as protected traitAssignRole;
        removeRole as protected traitRemoveRole;
        syncRoles as protected traitSyncRoles;
    }

    protected $connection = 'laravel_services';

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    public function userSettings(): HasMany
    {
        return $this->hasMany(UserSetting::class, 'user_id');
    }

    public static function getDefaultUser()
    {
        return Cache::remember('defaultUser', 3600, fn() => self::find(1));
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

    public function getCachedRole(): ?string
    {
        $cacheKey = "user_{$this->id}_role";

        return Cache::remember($cacheKey, now()->addHours(72), function () {
            return $this->getRoleNames()->first();
        });
    }

    public function clearCachedRole(): void
    {
        Cache::forget("user_{$this->id}_role");
    }

    public function assignRole(...$roles)
    {
        $result = $this->traitAssignRole(...$roles);
        $this->clearCachedRole();
        return $result;
    }

    public function removeRole($role)
    {
        $result = $this->traitRemoveRole($role);
        $this->clearCachedRole();
        return $result;
    }

    public function syncRoles(...$roles)
    {
        $result = $this->traitSyncRoles(...$roles);
        $this->clearCachedRole();
        return $result;
    }
}
