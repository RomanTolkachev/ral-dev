<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Model;

class CreatePermissionsService
{
    /**
     * Сгенерировать или обновить permissions сразу для нескольких моделей
     *
     * @param  array<class-string<Model>>  $models
     */
    public static function forModels(array $models): void
    {
        foreach ($models as $modelClass) {
            if (is_subclass_of($modelClass, Model::class)) {
                static::forModel(new $modelClass);
            }
        }
    }

    /**
     * Создать или обновить permissions для одной модели
     */
    public static function forModel(Model $model): void
    {
        $permissionClass = config('permission.models.permission');

        $item = $model::first();
        if (! $item) {
            return;
        }

        $flat = collect([$item])->customToFlat();
        $columns = array_keys($flat->first());

        $existingPermissions = $permissionClass::pluck('name')->toArray();

        foreach ($columns as $column) {
            $permissionName = "view_{$model->getTable()}.$column";

            if (! in_array($permissionName, $existingPermissions)) {
                $permissionClass::create(['name' => $permissionName]);
            }
        }

        $validPermissions = collect($columns)
            ->map(fn ($col) => "view_{$model->getTable()}.$col")
            ->toArray();

        // Удаляем только те, что относятся к этой модели
        $permissionClass::where('name', 'like', "view_{$model->getTable()}.%")
            ->whereNotIn('name', $validPermissions)
            ->delete();
    }
}
