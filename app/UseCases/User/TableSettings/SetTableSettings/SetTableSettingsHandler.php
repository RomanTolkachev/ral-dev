<?php

namespace App\UseCases\User\TableSettings\SetTableSettings;

use App\Models\UserSetting;
use Illuminate\Support\Facades\Cache;

class SetTableSettingsHandler
{
    public function __invoke(array $query)
    {
        $res = UserSetting::updateOrInsert(
            ['user_id' => $query['user_id'], 'settings_for_table' => $query['table_name']],
            ['settings_for_table' => $query['table_name'], 'settings' => json_encode($query['settings'])]
        );

        Cache::forget("user_{$query['user_id']}_settings_{$query['table_name']}");
        
        if (!$res) {
            return null;
        }

        return 'accepted';
    }
}