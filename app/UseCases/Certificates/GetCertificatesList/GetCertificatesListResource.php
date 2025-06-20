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

        /**
         * Фильтрует массив $data и оставляет только поля $only
         * Вложенные массивы тоже обрабатываются.
         */
        // function filterDataWithOnly(array $data, array $only): array
        // {

        //     // dd($data);
        //     return collect($data)->map(function ($item) use ($only) {
        //         $result = [];

        //         foreach ($item as $key => $value) {
        //             if (is_array($value)) {
        //                 // Обрабатываем вложенные массивы
        //                 $filtered = collect($value)->only($only)->toArray();

        //                 foreach ($filtered as $fKey => $fValue) {
        //                     if(array_key_exists($fKey, $item)) {
        //                         $result[$key . "__" .$fKey] = $fValue;
        //                         // dump($key);
        //                     } else {
        //                         $result[$fKey] = $fValue;
        //                     }
                            
                            
        //                 }
        //             } elseif (in_array($key, $only)) {
        //                 $result[$key] = $value;
        //             }
        //         }

        //         // dd($result, $only);

        //         // Упорядочиваем ключи в соответствии с $only
        //         return collect($only)->mapWithKeys(function ($k) use ($result) {
        //             return [$k => $result[$k] ?? null];
        //         });
        //     })->toArray();
        // }

        // dd(filterDataWithOnly($result["data"], $userCols), $result);

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
