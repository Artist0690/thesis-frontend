import axios from "../api/axios";

type Props = {
  name: string;
  email: string;
  password: string;
};

export const signup_controller = async (payload: Props) => {
  const URL = "/auth/register";
  return axios.post(URL, payload);
};
