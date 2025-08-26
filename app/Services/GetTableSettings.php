<?php

namespace App\Services;

use App\Models\User;

class GetTableSettings
{
    /**
     * Получает текущего пользтвателя и дефолтного, возвращает массив с нужными колонками
     * @param User $user текущий пользователь
     * @param User $defaultUser Пользователь с настройками по умолчанию
     */
    public static function for(User | null $user, User $defaultUser, string $for ): array
    {
        $getSettings = function (User | null $person) use ($for) {
            if ($person === null) {
                return [];
            }

            // Проверяем, что отношение userSettings существует и не null
            if (!$person->userSettings) {
                return [];
            }
            $settings = $person->userSettings
                ->firstWhere('settings_for_table', $for);

            return $settings ? json_decode(($settings->toArray()['settings'] ?? []), true) : [];
        };

        $userSettings = $getSettings($user);
        $defaultSettings = $getSettings($defaultUser) ?? [];

        return !empty($userSettings) ? $userSettings : $defaultSettings;
    }
}
