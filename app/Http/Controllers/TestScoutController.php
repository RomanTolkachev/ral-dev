<?php

namespace App\Http\Controllers;

use App\Models\RalShortInfo;
use Illuminate\Http\JsonResponse;

class TestScoutController
{
    public function __invoke()
    {
        $resp = RalShortInfo::query()
        ->leftJoin('np_mock', 'ral_short_info_mock.link', '=', 'np_mock.link')
        ->get()->toArray();
        dd($resp); 
    }
}
