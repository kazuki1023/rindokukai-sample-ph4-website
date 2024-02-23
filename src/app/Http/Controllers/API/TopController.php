<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

class TopController extends Controller
{
    // 適当なレスポンスを返す index 処理
    public function index()
    {
        return response()->json([
            'message' => 'Hello, World!',
        ]);
    }
}
