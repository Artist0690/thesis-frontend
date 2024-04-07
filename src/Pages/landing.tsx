import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import z from "zod";
import JSEncrypt from "jsencrypt";
import { enc_controller } from "../controllers/crypto_controller";

import forge, { pem } from "node-forge";
import KeyGeneration from "../crypto/KeyGeneration";
import { decrypt_RSA_cipher } from "../crypto/rsa_crypto";

const Landing = () => {
  const plaintext = "hello world from client";

  const { privateKey, publicKey } = KeyGeneration();

  const [cipher, setcipher] = useState<string | null>(null);
  const [decipher, setdecipher] = useState<string | null>(null);

  const handleClick = () => {
    const text = "hello world from client.";
    // send request ✈️
    const payolad = {
      plaintext: text,
      public_key: publicKey as string,
    };
    console.log("payload is >>>", payolad);

    enc_controller(payolad)
      .then((response) => {
        const Schema = z.object({ message: z.string(), cipher: z.string() });
        const Zcheck = Schema.safeParse(response.data);
        if (!Zcheck.success) {
          return;
        }
        setcipher(Zcheck.data.cipher);
        console.log(response.data);
      })
      .catch((error) => {
        const err = error as AxiosError;
        console.log(err.response?.data);
      });
  };

  const handleDecrypt = () => {
    if (!cipher) {
      return;
    }
    // start decrypt 🔓

    const decrypted = decrypt_RSA_cipher(cipher, privateKey as string);
    console.log("decipher is ...", decrypted);
    setdecipher(decrypted);
  };

  const handleTest = () => {
    const prvKey = forge.pki.privateKeyFromPem(privateKey as string);
    const pubKey = forge.pki.publicKeyFromPem(publicKey as string);
    const text = "hello";
    const encrypted = pubKey.encrypt(text, "RSA-OAEP");
    const decrypted = prvKey.decrypt(encrypted, "RSA-OAEP");
    console.log("decrypted is ...", decrypted);
  };

  return (
    <div className="text-red-500">
      <div>
        <button
          className="p-3 bg-slate-500 text-white rounded-lg"
          onClick={() => handleClick()}
        >
          click
        </button>
        {/* decrypt 🔓 */}
        <button
          className="bg-slate-700 p-3 rounded-lg ml-3 text-white disabled:bg-slate-400 disabled:cursor-not-allowed"
          onClick={() => handleDecrypt()}
          disabled={!cipher}
        >
          Decrypt
        </button>
      </div>
      {/* test btn */}
      <div>
        <button
          onClick={() => handleTest()}
          className="bg-blue-400 px-2 py-3 rounded-lg text-white"
        >
          Test enc/dec
        </button>
      </div>
      {typeof decipher == "string" ? <p>{decipher}</p> : <p>not yet</p>}
    </div>
  );
};

export default Landing;
