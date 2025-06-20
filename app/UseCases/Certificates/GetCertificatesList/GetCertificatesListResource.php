<?php

namespace App\UseCases\Certificates\GetCertificatesList;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;

class GetCertificatesListResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $result = parent::toArray($request);

        // dd($result);

        $userCols = $request->query()["user_columns"];

        // dd(collect($result["data"])->toFlatFilteredAndSorted($userCols)->toArray());

        $result["data"] = collect($result["data"])->toFlatFilteredAndSorted($userCols)->toArray();

        unset($result['links']);
        unset($result['path']);
        unset($result['first_page_url']);
        unset($result['last_page_url']);
        unset($result['next_page_url']);
        unset($result['prev_page_url']);

        return $result;
    }
}
