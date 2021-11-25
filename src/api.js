import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com/",
});

export async function getInfo() {
  return await api.get("/users/facebook/repos");
}

export default api;
