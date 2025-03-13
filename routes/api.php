<?php

use App\Http\Controllers\AccreditationAreaController;
use App\Http\Controllers\GetFiltersController;
use App\UseCases\GetRalShortInfoList\GetRalShortInfoListController;
use App\Http\Controllers\TestScoutController;
use App\Http\Controllers\GetCertificationBody;
use Illuminate\Support\Facades\Route;

Route::get("ral", GetRalShortInfoListController::class);
Route::get("ral/filters", GetFiltersController::class);
Route::get("ral/certification_body", GetCertificationBody::class);
Route::get("accreditation_area", AccreditationAreaController::class);
Route::get("ral/scout", TestScoutController::class);
