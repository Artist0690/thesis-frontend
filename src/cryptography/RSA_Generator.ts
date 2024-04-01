import * as crypto from "crypto";

export class RSA_generator {
  private privateKey: string;
  private publicKey: string;
  constructor() {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: "spki",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
      },
    });
    this.privateKey = privateKey;
    this.publicKey = publicKey;
  }

  getPrivateKey() {
    return this.privateKey;
  }
  getPublicKey() {
    return this.publicKey;
  }

  encrypted(msg: string, publicKey: string) {
    const encrypted_message = crypto.publicEncrypt(
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
      },
      Buffer.from(msg, "utf-8")
    );
    return encrypted_message;
  }

  decrypted(cipher: Buffer) {
    try {
      const decryptedData = crypto.privateDecrypt(
        {
          key: this.privateKey,
          padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
          oaepHash: "sha256",
        },
        cipher
      );
      return decryptedData.toString();
    } catch (error) {
      return "RSA decryption failed!";
    }
  }
}
