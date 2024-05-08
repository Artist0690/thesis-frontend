import CryptoJS from "crypto-js";

type Enc_Props = {
  plaintext: string;
  passphrase: string;
};

export const encrypt_msg = (props: Enc_Props) => {
  const { plaintext, passphrase } = props;

  const cipher = CryptoJS.AES.encrypt(plaintext, passphrase);
  return cipher.toString();
};

type Dec_Props = {
  cipher: string;
  passphrase: string;
};

export const decrypt_cipher = (props: Dec_Props) => {
  const { cipher, passphrase } = props;

  const decipher = CryptoJS.AES.decrypt(cipher, passphrase);
  var decryptedData = decipher.toString(CryptoJS.enc.Utf8);
  return decryptedData;
};
