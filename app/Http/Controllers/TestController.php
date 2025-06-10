<?php

namespace App\Http\Controllers;

use App\Models\AccreditationArea;
use App\Services\ConfirmRelationsService;

class TestController
{
    public function __invoke()
    {
        $service = new ConfirmRelationsService();
        dump($service->prepareRalations([], AccreditationArea::class));
    }
}
