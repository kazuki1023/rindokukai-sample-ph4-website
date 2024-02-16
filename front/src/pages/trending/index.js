import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { handleLogout } from "../../utils/authUtils";

export default function Trending() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [youtubeTrending, setTrendingYoutube] = useState([]);
  const [spotifyTrending, setTrendingSpotify] = useState([]);

  useEffect(() => {
    const name = localStorage.getItem("username");
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const fetchTrendingData = async () => {
      try {
        const response = await fetch("http://localhost/api/trending", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          router.push("/login");
          return;
        }

        const data = await response.json();
        console.log(data);

        setTrendingYoutube(data.youtubeTrending);
        setTrendingSpotify(data.spotifyTrending);
      } catch (error) {
        console.error("Failed to fetch trending data", error);
      }
    };

    fetchTrendingData();
    setUsername(name);
  }, []);

  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        {username ? (
          <div>
            <p className="text-lg font-semibold">Welcome, {username}!</p>
            <button
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link href="/login" className="text-lg font-semibold"></Link>
        )}
      </div>
      <h1 className="text-3xl font-bold mb-4">Trending Now:</h1>
      <div className="container mx-auto p-4 flex flex-col lg:flex-row">
        <div className="lg:w-1/3">
          <h2 className="text-xl font-bold mb-2">Music:</h2>
          <div className="flex flex-wrap -mx-2">
            {spotifyTrending.map((track) => (
              <div
                key={track.id}
                className="w-full sm:w-1/2 md:w-1/2 lg:w-full px-3 mb-4"
              >
                <iframe
                  src={`https://open.spotify.com/embed/playlist/${track.id}`}
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
            {youtubeTrending.map((video) => (
              <div
                key={video.etag}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 px-2 mb-4"
              >
                <h3 className="text-lg font-semibold mb-2">
                  {video.snippet.title}
                </h3>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={"https://www.youtube.com/embed/" + video.id}
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
