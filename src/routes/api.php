<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// 新規登録、ログイン
// Route::post('/register', [AuthController::class, 'register']);
// Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::middleware('auth:sanctum')->group(function () {
  // Route::get('/user', function (Request $request) {
  //   return $request->user();
  // });
  Route::get('/top', [API\TopController::class, 'index']);
  Route::get('/trending', [API\TrendingController::class, 'index']);
  Route::post('/search', [API\SearchController::class, 'index']);
});
