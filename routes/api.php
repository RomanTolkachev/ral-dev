<?php


use App\Http\Controllers\GetFiltersController;
use App\Http\Controllers\GetRalController;
use Illuminate\Support\Facades\Route;

Route::get("ral", GetRalController::class);
Route::get("ral/filters", GetFiltersController::class);
