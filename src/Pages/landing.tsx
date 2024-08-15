import React, { useState } from "react";
import CryptoJS from "crypto-js";
import Button from "../components/ui/Button";

const Landing = () => {
  const [plainText, setPlainText] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [decryptedText, setdecryptedText] = useState("");

  const key = CryptoJS.enc.Utf8.parse("f199dff60cad84b9"); // 16 bytes key for AES-128

  const encrypt = (text: string) => {
    const encrypted = CryptoJS.AES.encrypt(text, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  };

  const decrypt = (cipher: string) => {
    console.log("start decrypting");
    const decrypted = CryptoJS.AES.decrypt(cipher, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  };

  const handleEncrypt = () => {
    const encrypted = encrypt(plainText);
    setEncryptedText(encrypted);
  };

  const handleDecrypt = () => {
    const decrypted = decrypt(encryptedText);
    console.log("decrypted", decrypted);
    setdecryptedText(decrypted);
  };

  return (
    <div>
      <h1>AES Encryption</h1>
      <div>
        <label>Plain Text:</label>
        <input
          type="text"
          value={plainText}
          className="border border-black"
          onChange={(e) => setPlainText(e.target.value)}
        />
      </div>

      <Button onClick={handleEncrypt}>Encrypt</Button>
      {encryptedText && (
        <div>
          <h2>Encrypted Text</h2>
          <p>{encryptedText}</p>
        </div>
      )}
      <Button onClick={handleDecrypt}>Decrypt</Button>
      {decryptedText && (
        <div>
          <h2>Decrypted Text</h2>
          <p>{decryptedText}</p>
        </div>
      )}
    </div>
  );
};

export default Landing;
