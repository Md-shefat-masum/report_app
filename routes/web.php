<?php

use App\Models\ReportData;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', 'WebsiteController@index')->name('report_index');
Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/u',function(){
    $user = User::find(request()->id);
    $t = $user->createToken('accessToken')->accessToken;
    // return $t;
});

Auth::routes();
// Route::get('/data-reload', function () {
//     \Illuminate\Support\Facades\Artisan::call('migrate:refresh', ['--seed' => true]);
//     \Illuminate\Support\Facades\Artisan::call('migrate', ['--path' => 'vendor/laravel/passport/database/migrations', '--force' => true]);
//     \Illuminate\Support\Facades\Artisan::call('passport:install');
//     return redirect()->back();
// });

Route::get('/undefined', function () {
});
Route::get('/is-online', function () {
    return 1;
});

/**
    mongorestore --db it_database --verbose G:/it_database_18_oct_23_12_8p/it_database
    mongodump --uri="mongodb+srv://user:pass@cluster0.0fsdqn6.mongodb.net/?authSource=admin"
 */
