<?php

use App\Http\Controllers\Task\TaskController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'tasks'], static function() {
    Route::get('/', [TaskController::class, 'index']);
    Route::post('/', [TaskController::class, 'store']);
    Route::patch('/{id}', [TaskController::class, 'update']);
    Route::delete('/{id}', [TaskController::class, 'delete']);
});

/*
 * Здесь для безопасности можно добавить  middleware('throttle:5,1') для 429, но я уже без базы работаю
 */
