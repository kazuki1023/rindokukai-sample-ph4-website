<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Google_Client;
use Google_Service_YouTube;
use SpotifyWebAPI\SpotifyWebAPI;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class TrendingController extends Controller
{
    public function index(Request $request)
    {
        // YouTube Data API v3
        $youtubeClient = new Google_Client();
        $youtubeClient->setDeveloperKey(env('GOOGLE_DEVELOPER_KEY'));

        $youtubeService = new Google_Service_YouTube($youtubeClient);

        $youtubeResponse = $youtubeService->videos->listVideos('snippet', [
            'chart' => 'mostPopular',
            'regionCode' => 'US',
            'maxResults' => $request->input('maxResults', 10),
        ]);

        $youtubeTrending = $youtubeResponse->getItems();

        // Spotify API
        $clientId = env('SPOTIFY_CLIENT_ID');
        $clientSecret = env('SPOTIFY_CLIENT_SECRET');

        // Spotify API のアクセストークン取得エンドポイント
        $tokenEndpoint = 'https://accounts.spotify.com/api/token';

        // アクセストークンを取得するためのリクエスト
        $response = Http::asForm()->post($tokenEndpoint, [
            'grant_type' => 'client_credentials',
            'client_id' => $clientId,
            'client_secret' => $clientSecret,
        ]);

        // レスポンスからアクセストークンを取り出す
        $data = $response->json();
        $accessToken = $data['access_token'];

        // Spotify API へのトレンディングデータ取得リクエスト
        $spotifyApi = new SpotifyWebAPI();
        $spotifyApi->setAccessToken($accessToken);

        // Spotifyのトレンディングトラック取得
        $spotifyTrending = $spotifyApi->getFeaturedPlaylists()->playlists->items;

        return response()->json([
            'youtubeTrending' => $youtubeTrending,
            'spotifyTrending' => $spotifyTrending,
        ]);
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
