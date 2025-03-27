<?php

namespace App\Http\Controllers;

use App\Models\RalShortInfo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GetCertificationBody
{
    public function __invoke(Request $request)
    {
        $response = RalShortInfo::findOrFail($request->cert_id);
        return new JsonResponse($response);
    }
}
