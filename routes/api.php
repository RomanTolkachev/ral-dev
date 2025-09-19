<?php

use App\Http\Controllers\TestController;

use App\UseCases\AccreditationArea\{
    GetAccreditationAreaFilters\GetAccreditationAreaFiltersController,
    GetAccreditationAreaList\GetAccreditationAreaListController
};
use App\UseCases\Ral\{
    GetRalShortInfoFilters\GetRalShortInfoFiltersController,
    GetRalShortInfoList\GetRalShortInfoListController
};
use App\UseCases\Certificates\{
    GetCertificatesList\GetCertificatesListController,
    GetCertificatesFilters\GetCertificatesFiltersController,
    GetCertificatesExcel\GetCertificatesExcelController
};
use App\UseCases\User\{
    GetUser\GetUserController,
    Login\LoginController,
    LogOut\LogOutController,
    TableSettings\GetTableSettings\GetTableSettingsController,
    TableSettings\SetTableSettings\SetTableSettingsController
};
use App\UseCases\{
    GetAvailableColumns\GetAvailableColumnsController,
    GetDefaultColumns\GetDefaultColumnsController,
    GetCertificationBody\GetCertificationBodyController,
    GetInputValues\GetInputValuesController
};
use Illuminate\Support\Facades\Route;

Route::prefix('ral_short_info')->group(function () {
    Route::get("", GetRalShortInfoListController::class);
    Route::get("filters", GetRalShortInfoFiltersController::class);
    Route::get("certification_body", GetCertificationBodyController::class);
});

Route::prefix('accreditation_area')->group(function () {
    Route::get("", GetAccreditationAreaListController::class);
    Route::get("filters", GetAccreditationAreaFiltersController::class);
});

Route::prefix('certificates_short_info')->group(function () {
    Route::get("", GetCertificatesListController::class);
    Route::get("filters", GetCertificatesFiltersController::class);
    Route::get("export", GetCertificatesExcelController::class);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get("user", GetUserController::class);
    Route::get("user_columns", GetTableSettingsController::class);
    
    Route::post("set_settings", SetTableSettingsController::class);
    Route::post("log_out", LogOutController::class);
    Route::get("available_columns", GetAvailableColumnsController::class);
    Route::get("input_values", GetInputValuesController::class);
});

Route::middleware('web')->post("login", LoginController::class);

Route::get("default_columns", GetDefaultColumnsController::class);

Route::get("cache", TestController::class);
