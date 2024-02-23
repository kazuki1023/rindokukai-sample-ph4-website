import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // XSRF-TOKENの値をCookieから取得する関数
  function getCookieValue(name) {
    let matches = document.cookie.match(
      new RegExp(
        "(?:^|; )" +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
          "=([^;]*)"
      )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  const performLogin = () => {
    axios
      .get("http://localhost/sanctum/csrf-cookie", { withCredentials: true })
      .then(() => {
        return axios.post(
          "http://localhost/login",
          {
            email: email,
            password: password,
          },
          {
            withCredentials: true,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "X-XSRF-TOKEN": getCookieValue("XSRF-TOKEN"),
            },
          }
        );
      })
      .then((response) => {
        console.log("Login successful:", response);
        router.push("/top");
      });
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-bold mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-bold mb-2">
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-center mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => performLogin()}
        >
          Login
        </button>
      </div>
      <div className="text-center">
        <p className="text-gray-600 text-sm">アカウントがない場合はこちら:</p>
        <a
          href="/register" // 仮のリンク、適切なリンクに更新してください
          className="text-blue-500 hover:text-blue-600 font-bold"
        >
          新規登録
        </a>
      </div>
    </div>
  );
}
