import { useState } from "react";

export default function Test() {
  const [youtubeData, setYoutubeData] = useState([]);
  const [spotifyData, setSpotifyData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { q, maxResults } = Object.fromEntries(formData);

    const response = await fetch("http://localhost/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ q, maxResults }),
    });
    const data = await response.json();
    
    setYoutubeData(data.youtubeResults.items);
    setSpotifyData(data.spotifyResults);
  };

  return (
    <main className="text-red-500">
      <h1>Test</h1>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label>
          検索キーワード:
          <input type="text" name="q" />
        </label>
        <label>
          最大表示件数:
          <input type="number" name="maxResults" />
        </label>
        <button type="submit">OK!</button>
      </form>
      <div>
        <p>動画：</p>
        {youtubeData.map((video) => {
          return (
            <div key={video.etag}>
              <h2 className="text-red-500">{video.snippet.title}</h2>
              <iframe
                src={"https://www.youtube.com/embed/" + video.id.videoId}
                title={video.snippet.title}
              ></iframe>
            </div>
          );
        })}
      </div>
      <div>
        <p>音楽：</p>
        {spotifyData.map((track) => {
          return (
            <div key={track.id}>
              <h3>{track.name}</h3>
            </div>
          );
        })}
      </div>
    </main>
  );
}
