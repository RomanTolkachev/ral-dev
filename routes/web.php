<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/{any}', function () {
    return view('root');
})->where('any', '^(?!api).*$');



