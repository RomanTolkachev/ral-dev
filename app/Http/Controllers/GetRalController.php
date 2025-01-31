<?php

namespace App\Http\Controllers;

use App\Http\Filters\RalFilter;
use App\Http\Requests\GetRalRequest;
use App\Models\RalShortInfoMock;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

class GetRalController extends Controller
{
    public function __invoke(RalFilter $filter, GetRalRequest $request): JsonResponse
    {

        $userColumns = $request->query('user_columns');
        $ral = RalShortInfoMock::filter($filter)->select($userColumns)->paginate(
            page: $request->page,
            perPage: $request->perPage,
        );
        return new JsonResponse($ral);
    }
}
