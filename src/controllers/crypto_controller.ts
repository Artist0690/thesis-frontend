import axios from "../api/axios";

type Payload = {
  plaintext: string;
  public_key: string;
};

export const enc_controller = async (payload: Payload) => {
  const URL = "crypto/enc";
  return axios.post(URL, payload);
};
