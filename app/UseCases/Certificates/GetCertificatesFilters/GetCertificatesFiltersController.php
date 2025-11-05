<?php

namespace App\UseCases\Certificates\GetCertificatesFilters;

use Illuminate\Http\JsonResponse;
use App\Models\User;
use App\UseCases\Certificates\shared\GetCertificatesFilter;
use App\Models\CertificatesShortInfo;

class GetCertificatesFiltersController
{
    public function __invoke(GetCertificatesFilterHandler $handler, GetCertificatesFiltersRequest $request)
    {
        $res = $handler->execute(
            currentUser: $request->user(),
            defaultUser: User::getDefaultUser(),
            query: $request->all(),
            filter: new GetCertificatesFilter(new CertificatesShortInfo(), $request)
        );

        return new JsonResponse($res);
    }
}
