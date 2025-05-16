<?php

use Illuminate\Database\Eloquent\Builder;

trait ReadOnlyModelTrait
{
    protected static function fail(string $method): never
    {
        throw new \RuntimeException("Method {$method}() is not allowed on read-only model " . static::class);
    }

    public static function create(array $attributes = [])
    {
        static::fail(__FUNCTION__);
    }

    public static function forceCreate(array $attributes)
    {
        static::fail(__FUNCTION__);
    }

    public function save(array $options = [])
    {
        static::fail(__FUNCTION__);
    }

    public function update(array $attributes = [], array $options = [])
    {
        static::fail(__FUNCTION__);
    }

    public static function firstOrCreate(array $attributes, array $values = [])
    {
        static::fail(__FUNCTION__);
    }

    public static function firstOrNew(array $attributes, array $values = [])
    {
        static::fail(__FUNCTION__);
    }

    public static function updateOrCreate(array $attributes, array $values = [])
    {
        static::fail(__FUNCTION__);
    }

    public function delete()
    {
        static::fail(__FUNCTION__);
    }

    public static function destroy($ids)
    {
        static::fail(__FUNCTION__);
    }

    public function restore()
    {
        static::fail(__FUNCTION__);
    }

    public function forceDelete()
    {
        static::fail(__FUNCTION__);
    }

    public function performDeleteOnModel()
    {
        static::fail(__FUNCTION__);
    }

    public function push()
    {
        static::fail(__FUNCTION__);
    }

    public function finishSave(array $options)
    {
        static::fail(__FUNCTION__);
    }

    public function performUpdate(Builder $query, array $options = []): bool
    {
        static::fail(__FUNCTION__);
    }

    public function touch($attribute = null)
    {
        static::fail(__FUNCTION__);
    }

    public function insert()
    {
        static::fail(__FUNCTION__);
    }

    public function truncate()
    {
        static::fail(__FUNCTION__);
    }
}
