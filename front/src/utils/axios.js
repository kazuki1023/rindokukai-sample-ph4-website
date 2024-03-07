import axios from "axios";

const myAxios = axios.create({
  withCredentials: true,
  withXSRFToken: true,
  baseURL: "http://localhost",
});

export default myAxios;