<?php

namespace App\UseCases\GetCertificationBody;

use App\Models\RalShortInfoView;

class GetCertificationBodyUseCase
{
    public function execute(string $id): GetCertificationBodyResource
    {
        $response = RalShortInfoView::leftJoin('np_regulations_tnveds', 'np_regulations_tnveds.link', '=', 'ral_short_info_view.link')
            ->select(
                [
                    'ral_short_info_view.link',
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
                    'ral_short_info_view.regulations',
                    'np_regulations_tnveds.tnved',
                ]
            )->findOrFail($id);

        return new GetCertificationBodyResource($response);
    }
}
