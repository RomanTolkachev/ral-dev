<?php

namespace App\UseCases\Certificates\GetCertificatesExcel;

use App\Models\CertificatesShortInfo;
use App\UseCases\Certificates\shared\GetCertificatesFilter;

class GetCertificatesExcelHandler
{
    protected $filter;

    public function __construct(GetCertificatesExcelRequest $request)
    {
        $this->filter = new GetCertificatesFilter(
            new CertificatesShortInfo,
            $request
        );
    }

    public function execute()
    {
        $query = CertificatesShortInfo::with(["ralShortInfoView", "certificateApplicant", 'certificationAuthority', "statusChange"]);

        $result = $query->filter(
            $this->filter
        )->limit(1000)->get();

        return new GetCertificatesExcelExport($result);
    }
}
