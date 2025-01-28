<?php

namespace App\Models\Traits;

use Illuminate\Support\Facades\Schema;

trait HasColumnsHelp
{
    public static function getPublicHeaders(): array
    {
        $instance = new self();
        $allColumns = Schema::getColumnListing($instance->getTable());
        return array_diff($allColumns, $instance->getHidden());
    }

    public static function getAttributeType(string $key): string
    {
        $instance = new self();
        return Schema::getColumnType($instance->getTable(), $key);
    }
}
