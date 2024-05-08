import React, { useState } from "react";
import NotiAnimation from "../animation/notiAnimation";
import { decrypt_cipher, encrypt_msg } from "../crypto/AES/aes_crypto";

const TestSomething = () => {
  const passphrase = "GBSm%Z=1qFikI";
  const message = "hello world";

  const [cipher, setcipher] = useState<string | null>(null);
  const [decipher, setdecipher] = useState<string | null>(null);

  const handleEncrypt = () => {
    const encrypted = encrypt_msg({ passphrase, plaintext: message });
    setcipher(encrypted);
  };
  const handleDecrypt = () => {
    if (cipher) {
      const decrypted = decrypt_cipher({ cipher, passphrase });
      setdecipher(decrypted);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1>test something</h1>
      {/* buttons */}
      <div className="flex w-fit h-fit gap-x-10">
        <button
          onClick={handleEncrypt}
          className="bg-sky-300 px-3 py-2 rounded-lg"
        >
          encrypt
        </button>
        <button
          onClick={handleDecrypt}
          className="bg-red-500 px-3 py-2 rounded-lg"
        >
          decrypt
        </button>
      </div>

      {/* cipher and decipher */}
      <div className="flex flex-col gap-y-5 text-slate-900">
        <div>{cipher && cipher}</div>
        <div>{decipher && decipher}</div>
      </div>
    </div>
  );
};

export default TestSomething;
