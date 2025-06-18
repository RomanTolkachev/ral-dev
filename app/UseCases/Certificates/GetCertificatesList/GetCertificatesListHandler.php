<?php

namespace App\UseCases\Certificates\GetCertificatesList;

use App\Models\CertificatesShortInfo;
use App\Services\ConfirmRelationsService;


class GetCertificatesListHandler
{
    public function __construct(protected GetCertificatesListFilter $filter, protected ConfirmRelationsService $relations) {}

    public function execute(int $page, int $itemsPerPage, array $columns): GetCertificatesListResource
    {

        // dd($this->relations->prepareRalations($columns));
        $query = CertificatesShortInfo::with($this->relations->prepareRalations($columns));
        $noRelationsColumns = $this->relations->filterRelatedColumns($columns);

        foreach ($noRelationsColumns as $column) {
            switch ($column) {
                default:
                    $query->addSelect($column);
            }
        }

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