<?php
namespace App\Services;

use Illuminate\Support\Facades\Http;
use SpotifyWebAPI\SpotifyWebAPI;

class SpotifyService
{
    public function search(string $query, int $limit)
    {
        $config = config('services.spotify');

        // トークン取得
        $response = Http::asForm()->post($config['token_endpoint'], [
            'grant_type' => 'client_credentials',
            'client_id' => $config['client_id'],
            'client_secret' => $config['client_secret'],
        ]);

        if (!$response->successful()) {
            throw new \Exception('Failed to fetch Spotify token');
        }

        $accessToken = $response->json()['access_token'];

        // Spotify API への検索リクエスト
        $spotifyApi = new SpotifyWebAPI();
        $spotifyApi->setAccessToken($accessToken);

        return $spotifyApi->search($query, 'track', ['limit' => $limit]);
    }
}
