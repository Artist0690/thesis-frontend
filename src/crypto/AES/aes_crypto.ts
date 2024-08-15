import CryptoJS from "crypto-js";

type Enc_Props = {
  plaintext: string;
  passphrase: string;
};

export const encrypt_msg = (props: Enc_Props) => {
  const { plaintext, passphrase } = props;

  const key = CryptoJS.enc.Utf8.parse(passphrase);

  const encrypted = CryptoJS.AES.encrypt(plaintext, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};

type Dec_Props = {
  cipher: string;
  passphrase: string;
};

export const decrypt_cipher = (props: Dec_Props) => {
  const { cipher, passphrase } = props;

  const key = CryptoJS.enc.Utf8.parse(passphrase);

  const decrypted = CryptoJS.AES.decrypt(cipher, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};
