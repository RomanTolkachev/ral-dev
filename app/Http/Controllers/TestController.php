<?php

namespace App\Http\Controllers;

use App\Models\RalShortInfo;
use Illuminate\Http\JsonResponse;

class TestController
{
    public function __invoke()
    {
        return 'heelo world';
    }
}
