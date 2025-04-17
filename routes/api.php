<?php

use App\Http\Controllers\AccreditationAreaController;
use App\Http\Controllers\GetFiltersController;
use App\UseCases\GetRalShortInfoList\GetRalShortInfoListController;
use App\Http\Controllers\TestController;
use App\UseCases\GetCertificationBody\GetCertificationBodyController;
use App\UseCases\Login\LoginController;
use Illuminate\Support\Facades\Route;

Route::get("ral", GetRalShortInfoListController::class);
Route::get("ral/filters", GetFiltersController::class);
Route::get("ral/certification_body", GetCertificationBodyController::class);
Route::get("accreditation_area", AccreditationAreaController::class);
Route::middleware('auth:sanctum')->get("test", TestController::class);
Route::middleware('web')->post("login", LoginController::class);

