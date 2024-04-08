import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to VIBELY</h1>
        <p className="text-lg mb-8">人気の動画や音楽を見つけましょう！</p>
        <div className="flex flex-wrap justify-center">
          {/* Feature 1 */}
          <div className="w-full md:w-1/2 lg:w-1/2 p-4">
            <Link href="/trending">
              <div className="text-center p-6 border rounded-md border-blue-500 hover:border-blue-800 shadow-md">
                <h2 className="text-xl font-semibold mb-2">Trending</h2>
                <Image
                  src="/images/trending.svg"
                  alt="Trending"
                  width={450}
                  height={240}
                  className="my-4 mx-auto"
                />
                <p className="text-gray-700">
                  人気のプレイリストや動画に出会いましょう。
                </p>
              </div>
            </Link>
          </div>
          {/* Feature 2 */}
          <div className="w-full md:w-1/2 lg:w-1/2 p-4">
            <Link href="/search">
              <div className="text-center p-6 border rounded-md border-blue-500 hover:border-blue-800 shadow-md">
                <h2 className="text-xl font-semibold mb-2">Search</h2>
                <Image
                  src="/images/search.svg"
                  alt="Search"
                  width={450}
                  height={240}
                  className="my-4 mx-auto"
                />
                <p className="text-gray-700">
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
