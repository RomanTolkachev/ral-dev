<?php

namespace App\UseCases\User\TableSettings\GetTableSettings;

use App\Models\UserSetting;

class GetTableSettingsHandler
{
    public function __invoke(array $params)
    {
        $jsonRes = UserSetting::where('user_id', $params["userId"])->where('settings_for_table', $params["tableName"])->value('settings');
        
        if (!$jsonRes) {
            return null;
        }

        return json_decode($jsonRes);
    }
}