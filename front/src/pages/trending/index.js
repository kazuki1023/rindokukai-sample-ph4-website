import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import myAxios from "../../utils/axios";
import { checkAuthentication, performLogout } from "../../utils/authUtils";

export default function Trending() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [youtubeTrending, setTrendingYoutube] = useState([]);
  const [spotifyTrending, setTrendingSpotify] = useState([]);

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

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        const response = await myAxios.get("/api/trending");

        const data = response.data;
        console.log(data);

        setTrendingYoutube(data.youtubeTrending);
        setTrendingSpotify(data.spotifyTrending);
      } catch (error) {
        console.error("Failed to fetch trending data", error);
      }
    };

    fetchTrendingData();
  }, [user]); // userの変更を監視

  return (
    <main className="container mx-auto p-4">
      <header className="flex justify-between p-4">
        <div className="text-left w-30">
          <Image src="/images/logo.png" alt="Logo" width={50} height={50} />
        </div>
        <Link href="/top" className="text-center"></Link>
        <div className="text-right">
          {user && <p>Welcome, {user.name}!</p>}
          {user ? (
            <button className="cursor-pointer" onClick={handleLogout}>
              ログアウト
            </button>
          ) : (
            <Link href="/login">
              <p className="cursor-pointer">ログイン</p>
            </Link>
          )}
        </div>
      </header>
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
                key={video.id}
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
