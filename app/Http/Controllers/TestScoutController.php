<?php

namespace App\Http\Controllers;

use App\Models\RalShortInfoMock;
use Illuminate\Http\JsonResponse;

class TestScoutController
{
    public function __invoke()
    {
        $resp = RalShortInfoMock::query()
        ->leftJoin('np_mock', 'ral_short_info_mock.link', '=', 'np_mock.link')
        ->get()->toArray();
        dd($resp); 
    }
}
