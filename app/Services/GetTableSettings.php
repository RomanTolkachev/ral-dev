<?php

namespace App\Services;

use App\Models\User;

class GetTableSettings
{
    public static function for(User | null $user, User $defaultUser, string $for): array
    {
        $userSettings = $user ? $user->getTableSettingsFor($for) : [];
        $defaultSettings = $defaultUser->getTableSettingsFor($for) ?? [];

        return !empty($userSettings) ? $userSettings : $defaultSettings;
    }
}
