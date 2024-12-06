<?php

namespace App\Http\Controllers;

use App\Models\RalShortInfoMock;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class GetRalController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $ral = RalShortInfoMock::all();
        return new JsonResponse($ral);
    }
}
