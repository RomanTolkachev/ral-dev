<?php

namespace App\Http\Controllers;

use App\Models\RalShortInfoMock;
use Illuminate\Http\JsonResponse;

class TestScoutController
{
    public function __invoke()
    {
        $response = RalShortInfoMock::search("корроз")->get();
        dd($response);
        return new JsonResponse($response);
    }
}
