<?php

use App\Models\ReportData;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;

Route::get('/', 'WebsiteController@index')->name('report_index');
Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/set-p',function(){
    $user = User::find(1);
    $user->password = Hash::make('12345678');
    $user->save();
});

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
    return response()->json();
});
