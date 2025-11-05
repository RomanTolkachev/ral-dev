<?php

use Illuminate\Support\Facades\Route;

Route::get('/{any}', function () {
    return view('root');
})->where('any', '^(?!api).*$');



