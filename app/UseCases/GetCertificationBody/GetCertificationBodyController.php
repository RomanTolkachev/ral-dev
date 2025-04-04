<?php

namespace App\UseCases\GetCertificationBody;

use App\Models\RalShortInfoView;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GetCertificationBodyController
{
    public function __invoke(GetCertificationBodyUseCase $useCase, Request $request): JsonResponse
    {
        $result = $useCase->execute($request->cert_id);
        return new JsonResponse($result);
    }
}
