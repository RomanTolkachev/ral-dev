<?php

namespace App\Http\Controllers;

use App\Models\AccreditationArea;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AccreditationAreaController
{
    public function __invoke(Request $request)
    {
        // dd($request);
        return new JsonResponse(AccreditationArea::paginate(
            page: $request->page,
            perPage: $request->perPage,
        ));
    }
}
