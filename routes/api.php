<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\NotesController;
use App\Http\Controllers\RegisteredUserController;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// $routes = str_replace(".php", "", array_diff(scandir(base_path() . '/routes/api'), array('.', '..')));
// foreach ($routes as $route) {
//     Route::prefix($route)->group(base_path('routes/api/' . $route . '.php'));
// }

Route::group(['middleware' => ['api']], function () {
    Route::get('/me', [AuthenticationController::class, 'me']);

    Route::post('/login', [AuthenticationController::class, 'authenticate']);
    Route::post('/logout', [AuthenticationController::class, 'logout']);
    Route::post('/register', [RegisteredUserController::class, 'store']);
});

Route::group(['middleware' => ['api'], 'prefix' => 'notes'], function () {
    Route::get('', [NotesController::class, 'index']);
    Route::post('', [NotesController::class, 'storeNote']);
    Route::put('/complete/{note}', [NotesController::class, 'toggleComplete']);
    Route::put('/{note}', [NotesController::class, 'updateNote']);
    Route::delete('/{note}', [NotesController::class, 'deleteNote']);

    Route::post('/note-list', [NotesController::class, 'storeNoteList']);
    Route::put('/note-list/complete/{noteList}', [NotesController::class, 'toggleListComplete']);
    Route::put('/note-list/{noteList}', [NotesController::class, 'updateNoteList']);
    Route::delete('/note-list/{noteList}', [NotesController::class, 'deleteNoteList']);
});
