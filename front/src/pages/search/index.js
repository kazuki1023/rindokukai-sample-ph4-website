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

    console.log(data.spotifyResults);

    setYoutubeData(data.youtubeResults.items);
    setSpotifyData(data.spotifyResults);
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Search Results</h1>
      <form className="mb-8" onSubmit={handleSubmit}>
        <div className="flex flex-col lg:flex-row gap-2">
          <label className="mb-2">
            Search Keyword:
            <input
              type="text"
              name="q"
              className="text-black	border ml-2 p-2 rounded-md"
            />
          </label>
          <label className="mb-2">
            Max Results:
            <input
              type="number"
              name="maxResults"
              className="text-black border ml-2 p-2 rounded-md"
            />
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Search
        </button>
      </form>
      <div className="container mx-auto p-4 flex flex-col lg:flex-row">
        <div className="lg:w-1/3">
          <h2 className="text-xl font-bold mb-2">Music:</h2>
          <div className="flex flex-wrap -mx-2">
            {spotifyData.map((track) => (
              <div key={track.id} className="w-full sm:w-1/2 md:w-1/2 lg:w-full px-3 mb-4">
                <iframe
                  src={`https://open.spotify.com/embed/track/${track.id}`}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                  height="100"
                  loading="lazy"
                ></iframe>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-2/3">
          <h2 className="text-xl font-bold mb-2">Videos:</h2>
          <div className="flex flex-wrap -mx-2">
            {youtubeData.map((video) => (
              <div
                key={video.etag}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 px-2 mb-4"
              >
                <h3 className="text-lg font-semibold mb-2">
                  {video.snippet.title}
                </h3>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={"https://www.youtube.com/embed/" + video.id.videoId}
                    title={video.snippet.title}
                    className="w-full h-full rounded-md"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
