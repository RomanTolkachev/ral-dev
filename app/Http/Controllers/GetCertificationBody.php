<?php

namespace App\Http\Controllers;

use App\Models\RalShortInfo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GetCertificationBody
{
    public function __invoke(Request $request)
    {
        $response = RalShortInfo::select(
            [
                'link', 
                'RegNumber',
                'old_status_AL', 
                'new_status_AL', 
                'status_change_date', 
                'NPstatus',
                'NP_status_change_date',
                'nameType',
                'nameTypeActivity',
                'regDate',
                'address',
                'applicantINN',
                'applicantFullName',
                'oaDescription'
            ])->findOrFail($request->cert_id);
        return new JsonResponse($response);
    }
}
