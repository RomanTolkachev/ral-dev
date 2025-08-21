<?php

namespace App\UseCases\User\TableSettings\GetTableSettings;

use App\Models\UserSetting;
use Illuminate\Http\Request;

class GetTableSettingsHandler
{
    public function __invoke(Request $request)
    {
        $userID = $request->user()->id;
        $table = $request->validated()["for"];
        $jsonRes = UserSetting::where('user_id', $userID)->where('settings_for_table', $table)->value('settings');
        
        if (!$jsonRes) {
            return null;
        }

        return json_decode($jsonRes);
    }
}