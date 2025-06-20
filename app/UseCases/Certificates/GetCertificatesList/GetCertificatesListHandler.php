<?php

namespace App\UseCases\Certificates\GetCertificatesList;

use App\Models\CertificatesShortInfo;
use App\Services\ConfirmRelationsService;


class GetCertificatesListHandler
{
    public function __construct(protected GetCertificatesListFilter $filter, protected ConfirmRelationsService $relations) {}

    public function execute(int $page, int $itemsPerPage, array $columns): GetCertificatesListResource
    {
        
        $query = CertificatesShortInfo::with("ralShortInfoView");
        // $query = CertificatesShortInfo::with("ralShortInfoView")->get();
        // dd($this->relations->prepareRalations($columns));

        $noRelationsColumns = $this->relations->filterRelatedColumns($columns);

        // dd($query);

        // foreach ([...$noRelationsColumns] as $column) {
        //     switch ($column) {
        //         default:
        //             // dump($column);
        //             $query->addSelect($column);
        //     }
        // }

        // dd($query->toSql());

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