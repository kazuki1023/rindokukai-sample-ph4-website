import { useState } from "react";

export default function Test() {
  const [videoData, setVideoData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { q, maxResults } = Object.fromEntries(formData);
    const response = await fetch(
      `http://localhost/api/test?q=${q}&maxResults=${maxResults}`
    );
    const data = await response.json();
    console.log(data);
    // setVideoData(data);
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
        {/* {videoData.map(video => {
          return (
            <div key={video.id}>
              <h2>{video.title}</h2>
              <img src={video.thumbnail} alt={video.title} />
            </div>
          );
        })} */}
      </div>
    </main>
  );
}
