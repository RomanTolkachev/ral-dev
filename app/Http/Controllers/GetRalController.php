<?php

namespace App\Http\Controllers;

use App\Http\Filters\RalFilter;
use App\Models\RalShortInfoMock;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

class GetRalController extends Controller
{
    public function __invoke(RalFilter $filter): JsonResponse
    {

        $ral = RalShortInfoMock::filter($filter)->get();
        return new JsonResponse($ral);
    }
}
