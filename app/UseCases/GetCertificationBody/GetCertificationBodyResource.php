<?php

namespace app\useCases\GetCertificationBody;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GetCertificationBodyResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $data = $this->resource->toArray();
        
        if (array_key_exists('tnved', $data)) {
            $data['tnved'] = str_replace(';', '; ', $data['tnved']);
        }

        return $data;
    }
}
