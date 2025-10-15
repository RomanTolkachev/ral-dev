<?php

namespace App\UseCases\ParserInfo;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;

class ParserInfoController
{
    private $URL = "http://192.168.10.35:8000/api/v1/parser/indicator/2_0";
    public function __invoke()
    {
        try {
            $response = Http::get($this->URL);
            $data = $response->json();
        } catch (\Exception $e) {
            $data = null;
        }
        return new JsonResponse($data);
    }
}
