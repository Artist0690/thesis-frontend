import axios, { axiosPrivate } from "./axios";
import { toast } from "sonner";

export const logout = async () => {
  try {
    await axios.post("/auth/logout");
  } catch (error) {
    toast.error("Failed to sign out.", { position: "top-center" });
  }
};
