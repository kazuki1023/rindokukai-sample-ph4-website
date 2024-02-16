import { useRouter } from "next/router";

export const handleLogout = () => {
  const router = useRouter();
  // ログアウト処理を行い、必要に応じてトークンやユーザー情報をクリア
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  // ログインページにリダイレクト
  router.push('/login');
};