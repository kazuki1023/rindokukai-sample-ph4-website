import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { checkAuthentication, performLogout } from "../../utils/authUtils";

export default function TopPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await checkAuthentication();
      setUser(userData);
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
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">
          Welcome to (Service Name)
        </h1>
        <p className="text-lg mb-8 text-white">
          人気の動画や音楽を見つけましょう！
        </p>
        <div className="flex flex-wrap -mx-4">
          {/* Feature 1 */}
          <div className="w-full md:w-1/2 lg:w-1/2 p-4">
            <Link href="/trending">
              <div className="p-6 border rounded-md h-full border-blue-500 text-white">
                <h2 className="text-xl font-semibold mb-2">Trending</h2>
                <p className="text-gray-100">
                  人気のプレイリストや動画に出会いましょう。
                </p>
              </div>
            </Link>
          </div>
          {/* Feature 2 */}
          <div className="w-full md:w-1/2 lg:w-1/2 p-4">
            <Link href="/search">
              <div className="p-6 border rounded-md h-full border-blue-500 text-white">
                <h2 className="text-xl font-semibold mb-2">Search</h2>
                <p className="text-gray-100">
                  キーワードに沿って動画や音楽を検索しましょう。
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
