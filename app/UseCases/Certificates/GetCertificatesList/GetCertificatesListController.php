<?php

namespace App\UseCases\Certificates\GetCertificatesList;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class GetCertificatesListController
{
    public function __invoke(GetCertificatesListHandler $handler, GetCertificatesListRequest $request): JsonResponse
    {
        $result = $handler->execute(
            $request->page,
            $request->perPage,
            $request->user_columns,
            $request
        );

        return new JsonResponse($result, Response::HTTP_OK);
    }
}
