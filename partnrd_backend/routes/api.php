<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController; 


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

Route::group(['prefix' => 'password'],function() {
	Route::post('/email', 'ForgotPasswordController@forgot');
	Route::post('/reset', 'ResetPasswordController@reset')->name('password.reset');;
});

Route::post('client/register', 'AuthController@client_register'); 
Route::post('lawyer/register', 'AuthController@law_register'); 
Route::post('/login', 'AuthController@login')->name('login'); 


Route::get('email/verify', 'VerificationController@show')->name('verification.notice');
Route::get('email/verify/{id}', 'VerificationController@verify')->name('verification.verify');
Route::get('email/resend/{id}', 'VerificationController@resend')->name('verification.resend');


Route::get('users', 'UserController@list'); 
Route::get('users/{id}', 'UserController@show');
Route::post('users', 'UserController@store'); 
Route::put('users/{id}', 'UserController@update'); 
Route::delete('users/{id}', 'UserController@destory'); 

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::post('agreements', 'AgreementController@store'); 
// Route::get('agreements/{id}', 'AgreementController@show');
// Route::get('agreements', 'AgreementController@index'); 

Route::group([
], function ($router) {
    Route::apiResource('agreements', 'AgreementController');
});

Route::fallback(function(){
    return response()->json(['message' => 'Resource not found.'], 404);
});
