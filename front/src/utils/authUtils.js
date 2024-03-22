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
    await myAxios.post("/logout");
    console.log("Logout successful");
    return true; 
  } catch (error) {
    console.error("Logout failed:", error);
    return false;
  }
};
