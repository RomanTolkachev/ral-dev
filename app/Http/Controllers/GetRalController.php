<?php

namespace App\Http\Controllers;

use App\Http\Filters\RalFilter;
use App\Http\Requests\GetRalRequest;
use App\Http\Resources\GetRalResource;
use App\Models\RalShortInfoMock;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

class GetRalController extends Controller
{
    public function __invoke(RalFilter $filter, GetRalRequest $request): JsonResponse
    {
        $with = ['npMocks:id,link,exclude_date,include_date'];
        $result = RalShortInfoMock::with($with)->take(50)->get();

        return new JsonResponse(GetRalResource::collection($result));

        // $userColumns = $request->query('user_columns');
        // $tableName = (new RalShortInfoMock())->getTable();
        // $userColumnsWithPrefixes = array_map(fn($column) => $tableName . "." . $column, $userColumns);
        // $joinedColumns = ['np_mock.link'];
        // $ral = RalShortInfoMock::select($userColumnsWithPrefixes)->filter($filter)

        // ->leftJoin('np_mock', 'ral_short_info_mock.link', '=', 'np_mock.link')
        // ->paginate(
        //     page: $request->page,
        //     perPage: $request->perPage,
        // );
        // return new JsonResponse($ral);
    }
}
