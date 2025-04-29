<?php

use App\Http\Controllers\AccreditationAreaController;
use App\Http\Controllers\GetFiltersController;
use App\UseCases\GetRalShortInfoList\GetRalShortInfoListController;
use App\Http\Controllers\TestController;
use App\UseCases\GetCertificationBody\GetCertificationBodyController;
use App\UseCases\User\GetUser\GetUserController;
use App\UseCases\User\Login\LoginController;
use App\UseCases\User\Logout\LogOutController;
use App\UseCases\User\TableSettings\GetTableSettings\GetTableSettingsController;
use App\UseCases\User\TableSettings\SetTableSettings\SetTableSettingsController;
use Illuminate\Support\Facades\Route;

Route::get("ral", GetRalShortInfoListController::class);
Route::get("ral/filters", GetFiltersController::class);
Route::get("ral/certification_body", GetCertificationBodyController::class);
Route::get("accreditation_area", AccreditationAreaController::class);
Route::middleware('auth:sanctum')->get("test", TestController::class);
Route::middleware('auth:sanctum')->get("user", GetUserController::class);
Route::middleware('auth:sanctum')->get("settings", GetTableSettingsController::class);
Route::middleware('auth:sanctum')->post("set_settings", SetTableSettingsController::class);
Route::middleware('auth:sanctum')->post("log_out", LogOutController::class);
Route::middleware('web')->post("login", LoginController::class);

