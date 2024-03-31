import { AxiosError } from "axios";
import axios from "../api/axios";

export const access_controller = async (accessToken: string) => {
  try {
    const response = await axios.get("/chats", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    if ((error as AxiosError).response?.status === 401) {
      return "refresh_token";
    }
    return (error as AxiosError).response?.data;
  }
};
