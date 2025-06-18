<?php

namespace App\UseCases\Certificates\GetCertificatesList;

use Illuminate\Database\Eloquent\Builder;
use App\Http\Filters\AbstractFilter;
use App\Models\CertificatesShortInfo;
use Illuminate\Support\Facades\DB;


class GetCertificatesListFilter extends AbstractFilter
{

    protected $model;
    // protected $request;
    public function __construct(CertificatesShortInfo $model, GetCertificatesListRequest $request)
    {
        $this->model = $model;
        parent::__construct($request);
    }

    /**
     * Фильтрация по Ссылке
     *
     * @param array $value
     * @return Builder
     */

    // protected function ralShortInfoViewFullName(array $value): Builder
    // {
    //     $query = $this->builder;
    //     return $query;
    // }

}
