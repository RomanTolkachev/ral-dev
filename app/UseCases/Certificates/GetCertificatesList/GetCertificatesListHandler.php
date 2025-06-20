<?php

namespace App\UseCases\Certificates\GetCertificatesList;

use App\Models\CertificatesShortInfo;
use App\Services\ConfirmRelationsService;


class GetCertificatesListHandler
{
    public function __construct(protected GetCertificatesListFilter $filter, protected ConfirmRelationsService $relations) {}

    public function execute(int $page, int $itemsPerPage, array $columns): GetCertificatesListResource
    {
        
        $query = CertificatesShortInfo::with(["ralShortInfoView", "certificateApplicant", 'certificationAuthority']);

        $result = $query->filter(
            $this->filter
        )
        ->paginate(
            page: $page,
            perPage: $itemsPerPage
        );
      
        return new GetCertificatesListResource($result);
    }

}