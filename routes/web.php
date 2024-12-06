<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/{any}', function () {
    return inertia::render('Main');
})->where('any', '^(?!api).*$');



