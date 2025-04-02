<?php

namespace App\Http\Controllers;

use App\Models\RalShortInfoView;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GetCertificationBody
{
    public function __invoke(Request $request)
    {
        $response = RalShortInfoView::leftJoin('np_regulations_tnveds', 'np_regulations_tnveds.link', '=', 'ral_short_info.link')
                ->select(
                [
                    'ral_short_info.link', 
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
                    'oaDescription',
                    'np_regulations_tnveds.regulation',
                    'np_regulations_tnveds.tnved'
                ])->findOrFail($request->cert_id);
        return new JsonResponse($response);
    }
}
