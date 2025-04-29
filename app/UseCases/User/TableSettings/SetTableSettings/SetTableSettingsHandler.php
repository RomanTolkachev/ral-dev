<?php

namespace App\UseCases\User\TableSettings\SetTableSettings;

use App\Models\UserSetting;

class SetTableSettingsHandler
{
    public function __invoke(array $query)
    {
// dd($query);
        $res = UserSetting::updateOrInsert(
            ['user_id' => $query['user_id']],
            ['settings_for_table' => $query['table_name'], 'settings' => json_encode($query['settings'])]
        );
        
        if (!$res) {
            return null;
        }

        return 'accepted';
    }
}