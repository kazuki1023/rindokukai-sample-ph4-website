import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import myAxios from "../../utils/axios";
import { checkAuthentication, performLogout } from "../../utils/authUtils";

export default function Search() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [youtubeData, setYoutubeData] = useState([]);
  const [spotifyData, setSpotifyData] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await checkAuthentication();
      if (!userData) {
        router.push("/login");
      } else {
        setUser(userData);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    const result = await performLogout();
    if (result) {
      router.push("/login");
    } else {
      console.error("Logout failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      const { q, maxResults } = Object.fromEntries(formData);

      const response = await myAxios.post("/api/search", {
        q,
        maxResults,
      });

      const data = response.data;
      console.log(data);

      setYoutubeData(data.youtubeResults.items);
      setSpotifyData(data.spotifyResults);
    } catch (error) {
      console.error("Failed to fetch search results", error);
    }
  };

  return (
    <main className="container mx-auto p-4">
      <header className="flex justify-between p-4">
        <div className="text-left">
          {user && <p className="text-white">Welcome, {user.name}!</p>}
        </div>
        <div className="text-right">
          {user ? (
            <a className="text-white cursor-pointer" onClick={handleLogout}>
              ログアウト
            </a>
          ) : (
            <Link href="/login" className="text-white">
              ログイン
            </Link>
          )}
        </div>
      </header>
      <h1 className="text-3xl font-bold mb-4">Search Results</h1>
      <form id="searchForm" className="mb-8" onSubmit={handleSubmit}>
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
              <div
                key={track.id}
                className="w-full sm:w-1/2 md:w-1/2 lg:w-full px-3 mb-4"
              >
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
                key={video.id.videoId}
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
