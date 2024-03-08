import myAxios from "./axios";

export const checkAuthentication = async () => {
  try {
    const response = await myAxios.get('/api/user');
    return response.data; 
  } catch (error) {
    return null; 
  }
};

export const performLogout = async () => {
  try {
    await myAxios.get("http://localhost/sanctum/csrf-cookie");
    await myAxios.post("http://localhost/logout", { withCredentials: true });
    console.log("Logout successful");
    return true; 
  } catch (error) {
    console.error("Logout failed:", error);
    return false;
  }
};
