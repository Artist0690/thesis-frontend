import * as crypto from "crypto";
import CryptoJS from "crypto-js";

export class AES_Generator {
  private iv = crypto.randomBytes(16);

  encrpyed(msg: string, passphrase: string) {
    const cipher = CryptoJS.AES.encrypt(msg, passphrase, this.iv);
    return cipher.toString();
  }

  decrypted(cipher: string, passphrase: string) {
    try {
      const bytes = CryptoJS.AES.decrypt(cipher, passphrase, this.iv);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      return "AES decryption failed";
    }
  }
}
