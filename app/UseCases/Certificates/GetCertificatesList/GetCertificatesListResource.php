<?php

namespace App\UseCases\Certificates\GetCertificatesList;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;

class GetCertificatesListResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $result = parent::toArray($request);

        $userCols = $request->query()["user_columns"];

        
        // dd( $result["data"]);
        $result["data"] = collect($result["data"])->customToFlat()->sortByTemplate($userCols)->toArray();
        // dd( $userCols);

        unset($result['links']);
        unset($result['path']);
        unset($result['first_page_url']);
        unset($result['last_page_url']);
        unset($result['next_page_url']);
        unset($result['prev_page_url']);

        return $result;
    }
}
