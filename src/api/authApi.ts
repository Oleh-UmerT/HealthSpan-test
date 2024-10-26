import axios from "axios";

export const login = async () => {
  const response = await axios.post("/auth");
  return response.data;
};

export const refreshAccessToken = async (id: string, refreshToken: string) => {
  const response = await axios.post("/auth/refresh", {
    id,
    refreshToken,
  });
  return response.data;
};