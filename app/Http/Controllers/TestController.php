<?php

namespace App\Http\Controllers;

use App\Services\CreatePermissionsService;
use App\Models\CertificatesShortInfo;
use App\Models\RalShortInfoView;
use App\Models\AccreditationArea;

class TestController
{
    public function __invoke()
    {
        CreatePermissionsService::forModel(new CertificatesShortInfo);
        CreatePermissionsService::forModel(new RalShortInfoView);
        CreatePermissionsService::forModel(new AccreditationArea);

        return 'ok';
    }
}
