<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class TestController
{
    public function __invoke()
    {
        // $res = Cache::forget("defaultUser");
        $res = Cache::get("defaultUser");
        return new JsonResponse($res);
    }
}
