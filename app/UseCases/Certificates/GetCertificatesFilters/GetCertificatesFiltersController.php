<?php

namespace App\UseCases\Certificates\GetCertificatesFilters;

use Illuminate\Http\JsonResponse;
class GetCertificatesFiltersController
{
    public function __invoke(GetCertificatesFilterHandler $handler)
    {
        $res = $handler->execute();
        return new JsonResponse($res);
    }
}
