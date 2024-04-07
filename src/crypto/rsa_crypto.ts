import forge from "node-forge";

export const decrypt_RSA_cipher = (cipher: string, pem: string) => {
  const prvKey = forge.pki.privateKeyFromPem(pem);
  const decipher = prvKey.decrypt(cipher, "RSA-OAEP");
  return decipher;
};
