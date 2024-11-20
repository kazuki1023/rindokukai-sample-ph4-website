<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Google_Client;
use Google_Service_YouTube;
use App\Services\SpotifyService;
use App\Services\YouTubeService;
use SpotifyWebAPI\SpotifyWebAPI;
use App\Http\Requests\SearchRequest;
use Illuminate\Support\Facades\Http;

class SearchController extends Controller
{
    private $spotifyService;
    private $youtubeService;

    public function __construct(SpotifyService $spotifyService, YouTubeService $youtubeService)
    {
        $this->spotifyService = $spotifyService;
        $this->youtubeService = $youtubeService;
    }

    public function index(SearchRequest $request)
    {
        $limit = $request->input('maxResults', 10);
        $query = $request->input('q');

        $youtubeResults = $this->youtubeService->search($query, $limit);
        $spotifyResults = $this->spotifyService->search($query, $limit);

        return response()->json([
            'youtubeResults' => $youtubeResults,
            'spotifyResults' => $spotifyResults,
        ]);
    }
}
