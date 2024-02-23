import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Link from "next/link";
import { useHandleLogout } from "../../utils/authUtils";

export default function Search() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [youtubeData, setYoutubeData] = useState([]);
  const [spotifyData, setSpotifyData] = useState([]);

  const handleSubmit = async (e, token) => {
    e.preventDefault();

    // CSRFトークンを取得
    await fetch("http://localhost/sanctum/csrf-cookie", {
      method: "GET",
      credentials: "include",
    });

    // XSRF-TOKEN クッキーからトークン値を取得
    const xsrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      .split("=")[1];

    try {
      const formData = new FormData(e.target);
      const { q, maxResults } = Object.fromEntries(formData);

      const response = await fetch("http://localhost/api/search", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ q, maxResults }),
      });

      if (response.status === 401) {
        router.push('/login');
        return;
      }

      const data = await response.json();
      console.log(data);

      setYoutubeData(data.youtubeResults.items);
      setSpotifyData(data.spotifyResults);
    } catch (error) {
      console.error("Failed to fetch search results", error);
    }
  };

  useEffect(() => {
    const name = localStorage.getItem("username");
    const token = localStorage.getItem("token");

    if (!token) {
      router.push('/login');
      return;
    }

    // イベントハンドラにトークンを渡して handleSubmit を呼び出す
    const formSubmitHandler = (e) => handleSubmit(e, token);

    // フォームのイベントリスナーを設定
    document
      .getElementById("searchForm")
      .addEventListener("submit", formSubmitHandler);

    setUsername(name);

    // コンポーネントがアンマウントされるときにイベントリスナーを削除
    return () => {
      document
        .getElementById("searchForm")
        .removeEventListener("submit", formSubmitHandler);
    };
  }, [setUsername]);

  const handleLogout = useHandleLogout();

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
