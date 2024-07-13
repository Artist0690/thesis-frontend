import forge from "node-forge";
import { toast } from "sonner";

export const decrypt_RSA_cipher = (cipher: string, pem: string) => {
  const prvKey = forge.pki.privateKeyFromPem(pem);
  const decodedCipher = forge.util.decode64(cipher);
  // console.log("cipher ", cipher);
  // console.log("decoded cipher ", decodedCipher);
  const decipher = prvKey.decrypt(decodedCipher, "RSA-OAEP");
  // toast.info(`plaintext passphrase ${decipher}`, {
  //   position: "top-right",
  //   duration: 2000,
  // });
  return decipher;
};
