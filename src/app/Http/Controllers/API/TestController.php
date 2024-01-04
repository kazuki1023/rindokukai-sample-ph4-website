<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Google_Client;
use Google_Service_YouTube;
use Illuminate\Http\Request;

class TestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $client = new Google_Client();
        $client->setDeveloperKey(env('GOOGLE_DEVELOPER_KEY'));

        // Define service object for making API requests.
        $service = new Google_Service_YouTube($client);

        $response = $service->search->listSearch('id, snippet', array(
            'q' => $request->q,
            'maxResults' => $request->maxResults,
        ));

        return $response->toSimpleObject();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
