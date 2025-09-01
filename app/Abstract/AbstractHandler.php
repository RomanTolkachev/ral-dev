<?php

namespace App\Abstract;

use App\Services\GetTableSettings;

abstract class AbstractHandler
{
    public function __construct(protected GetTableSettings $getTableSettingsService)
    {

    }
}
