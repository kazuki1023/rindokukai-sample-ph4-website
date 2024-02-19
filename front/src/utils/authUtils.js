import { useRouter } from "next/router";

export const useHandleLogout = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    router.push('/login');
  };

  return handleLogout;
};