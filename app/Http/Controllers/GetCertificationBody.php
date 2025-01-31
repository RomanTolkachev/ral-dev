<?php

namespace App\Http\Controllers;

use App\Models\RalShortInfoMock;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GetCertificationBody
{
    public function __invoke(Request $request)
    {
        $response = RalShortInfoMock::where('id', $request->query()['cert_id'])->get();
        return new JsonResponse($response);
    }
}
