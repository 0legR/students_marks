<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

Auth::routes();

// Route::get('/home', 'HomeController@index')->name('home');


// -------------------signup--------------
Route::get('/api/users/{identifier}', 'Users\UserController@sendUser');
Route::post('/api/users', 'Users\UserController@store');
// -----------------login--------------
Route::post('/api/auth', 'Users\UserController@authUser');

// ------------------------students-------------------------------------
Route::post('/api/students', 'StudentsController@storeStudent');
Route::get('/api/students', 'StudentsController@sendStudents');
Route::delete('/api/students', 'StudentsController@destroyStudents');

// ------------------------students settings-----------------------------

Route::get('/api/students/settings', 'StudentsController@sendStudentsSettings');
Route::post('/api/students/settings', 'StudentsController@storeColumn');
Route::get('/api/students/settings/{identifier}', 'StudentsController@getColumn');
Route::put('/api/students/settings/{name}', 'StudentsController@storeColumn');
Route::delete('/api/students/settings/{name}', 'StudentsController@destroyColumn');
















// Route::get('issues-modal/{company}', 'CompanyController@layoutModal');
// Route::post('issues-list/store', 'CompanyController@saveLayoutList');

// Route::group([
//     'prefix' => 'statistic',
// ], function () {
//     Route::get('tasks', 'StatsController@orders');
//     Route::get('projects', 'StatsController@tasks');
//     Route::get('managers', 'StatsController@managers');
//     Route::get('designers', 'StatsController@designers');
// });
// Route::group([
// 		'prefix' => '/api/users',
// 	], function() {
// 		Route::get('/', 'Users\UserController@store');
// 		// Route::get('/:identifier', )	
// 	}
// );
