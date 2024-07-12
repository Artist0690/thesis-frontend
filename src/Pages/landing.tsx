import React, { useState } from "react";
import KeyGeneration from "../crypto/RSA/KeyGeneration";
import Button from "../components/ui/Button";
import forge, { cipher } from "node-forge";

const Landing = () => {
  const [Cipher, setCipher] = useState<string>("");
  const [OriginalText, setOriginalText] = useState("");

  const keyPairs = KeyGeneration();

  const text = "hello world";

  console.log(keyPairs.privateKey);
  console.log(keyPairs.publicKey);

  const encrypt = () => {
    if (keyPairs.publicKey) {
      const publicKey = forge.pki.publicKeyFromPem(keyPairs.publicKey);
      const cipher = publicKey.encrypt(text);
      const formattedCipher = forge.util.encode64(cipher);
      setCipher(formattedCipher);
      console.log("Cipher : ", formattedCipher);
      return;
    }
    alert("no publi key!");
    return;
  };

  const decrypt = () => {
    if (keyPairs.privateKey) {
      const privateKey = forge.pki.privateKeyFromPem(keyPairs.privateKey);
      const decodedCipher = forge.util.decode64(Cipher);
      const originalText = privateKey.decrypt(decodedCipher);
      setOriginalText(originalText);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-auto h-auto p-10">
        <Button onClick={() => encrypt()}>encrypt</Button>
        {Cipher.length > 0 ? (
          <p className="max-w-[300px] h-auto overflow-x-auto bg-zinc-400 rounded-lg text-white">
            {Cipher}
          </p>
        ) : null}
        <Button onClick={() => decrypt()}>decrypt</Button>
        {OriginalText.length > 0 ? (
          <p className="max-w-[300px] h-auto overflow-x-auto bg-slate-400 rounded-lg text-white">
            {OriginalText}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default Landing;
