export const handleLogout = () => {
  // ログアウト処理を行い、必要に応じてトークンやユーザー情報をクリア
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  // ログインページにリダイレクト
  window.location.href = "/login";
};