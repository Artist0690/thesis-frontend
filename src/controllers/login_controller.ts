import axios from "../api/axios";

type Props = {
  email: string;
  password: string;
};

export const login_controller = async (payload: Props) => {
  const URL = "/auth/login";
  const response = await axios.post(URL, payload);
  return response;
};
