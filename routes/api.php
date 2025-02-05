<?php


use App\Http\Controllers\GetFiltersController;
use App\Http\Controllers\GetRalController;
use App\Http\Controllers\TestScoutController;
use Illuminate\Support\Facades\Route;

Route::get("ral", GetRalController::class);
Route::get("ral/filters", GetFiltersController::class);
Route::get("ral/scout", TestScoutController::class);
