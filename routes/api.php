<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group(
    ['prefix' => 'v1'],
    function () {
        Route::group(['prefix' => '/user', 'middleware' => ['guest:api']], function () {
            Route::post('/get-token', 'Auth\ApiLoginController@get_token');
            Route::post('/api-login', 'Auth\ApiLoginController@login');
            Route::post('/api-register', 'Auth\ApiLoginController@register');
            Route::get('/auth-check', 'Auth\ApiLoginController@auth_check');
            Route::post('/forget-mail', 'Auth\ApiLoginController@forget_mail');
            Route::post('/email-validate', 'Auth\ApiLoginController@email_validate');
        });

        Route::group(['middleware' => ['auth:api']], function () {

            Route::group(['prefix' => 'user'], function () {
                Route::post('/api-logout', 'Auth\ApiLoginController@logout');
                Route::get('/user_info', 'Auth\ApiLoginController@user_info');
                Route::post('/check-auth', 'Auth\ApiLoginController@check_auth');
                Route::post('/find-user-info', 'Auth\ApiLoginController@find_user_info');
            });

            Route::group(['prefix' => 'user'], function () {
                Route::post('/update-profile', 'Auth\ProfileController@update_profile');
            });

            Route::group(['prefix' => 'user'], function () {
                Route::post('/find-users', 'Report\MentorController@find');
                Route::post('/find-users-by-email', 'Report\MentorController@find_by_email');
                Route::post('/user-mentors', 'Report\MentorController@user_mentors');
                Route::post('/user-followers', 'Report\MentorController@user_followers');
                Route::post('/modarator-follow', 'Report\MentorController@follow');
                Route::post('/modarator-unfollow', 'Report\MentorController@unfollow');

                Route::post('/submit-sugession', 'Report\MentorController@submit_sugession');
                Route::post('/get-all-sugession', 'Report\MentorController@get_all_sugession');
            });

            Route::group(['prefix' => '/report'], function () {

                Route::get('/get-report-columns','Report\ReportController@get_report_column_names');
                Route::get('/get-report-column-values','Report\ReportController@get_report_column_values');
                Route::post('/set-report-col-data','Report\ReportController@set_report_col_data');

                Route::get('/get-daily-report','Report\ReportController@make_report_body');
                Route::post('/update-daily-report','Report\ReportController@update_daily_report');

                Route::post('/get-date-to-date-report-details','Report\ReportController@get_date_to_date_report_details');

                Route::post('/get-monthly-report','Report\ReportController@get_monthly_report');
                Route::post('/set-monthly-report','Report\ReportController@set_monthly_report');

                Route::post('/get-yearly-plan','Report\ReportPlanController@get_yearly_plan');
                Route::post('/set-yearly-plan','Report\ReportPlanController@set_yearly_plan');

                Route::post('/get-monthly-plan','Report\ReportPlanController@get_monthly_plan');
                Route::post('/set-monthly-plan','Report\ReportPlanController@set_monthly_plan');

            });
        });
    }
);
