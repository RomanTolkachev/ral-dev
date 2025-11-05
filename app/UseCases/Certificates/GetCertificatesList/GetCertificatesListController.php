<?php

namespace App\UseCases\Certificates\GetCertificatesList;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use App\UseCases\Certificates\shared\GetCertificatesFilter;
use App\Models\CertificatesShortInfo;
use App\Models\User;

class GetCertificatesListController
{
    public function __invoke(GetCertificatesListHandler $handler, GetCertificatesListRequest $request): JsonResponse
    {
        $result = $handler->execute(
            page: $request->page,
            itemsPerPage: $request->perPage,
            user: $request->user(),
            defaultUser: User::getDefaultUser(),
            filter: new GetCertificatesFilter(new CertificatesShortInfo(), $request)
        );

        return new JsonResponse($result, Response::HTTP_OK);
    }
}
