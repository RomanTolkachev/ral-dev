<?php

use App\UseCases\AccreditationArea\GetAccreditationAreaFilters\GetAccreditationAreaFiltersController;
use App\UseCases\AccreditationArea\GetAccreditationAreaList\GetAccreditationAreaListController;
use App\Http\Controllers\GetFiltersController;
use App\UseCases\GetRalShortInfoList\GetRalShortInfoListController;
use App\UseCases\Certificates\GetCertificatesList\GetCertificatesListController;
use App\UseCases\Certificates\GetCertificatesFilters\GetCertificatesFiltersController;
use App\Http\Controllers\TestController;
use App\UseCases\GetCertificationBody\GetCertificationBodyController;
use App\UseCases\User\GetUser\GetUserController;
use App\UseCases\User\Login\LoginController;
use App\UseCases\User\LogOut\LogOutController;
use App\UseCases\User\TableSettings\GetTableSettings\GetTableSettingsController;
use App\UseCases\User\TableSettings\SetTableSettings\SetTableSettingsController;
use App\UseCases\GetInputValues\GetInputValuesController;
use Illuminate\Support\Facades\Route;


Route::get("test", TestController::class);
Route::get("ral", GetRalShortInfoListController::class);
Route::get("ral/filters", GetFiltersController::class);
Route::get("ral/certification_body", GetCertificationBodyController::class);
Route::get("accreditation_area", GetAccreditationAreaListController::class);
Route::get("accreditation_area/filters", GetAccreditationAreaFiltersController::class);

Route::get("certificates", GetCertificatesListController::class);
Route::get("certificates/filters", GetCertificatesFiltersController::class);

Route::get("input_values", GetInputValuesController::class);
Route::middleware('auth:sanctum')->get("user", GetUserController::class);
Route::middleware('auth:sanctum')->get("settings", GetTableSettingsController::class);
Route::middleware('auth:sanctum')->post("set_settings", SetTableSettingsController::class);
Route::middleware('auth:sanctum')->post("log_out", LogOutController::class);
Route::middleware('web')->post("login", LoginController::class);

