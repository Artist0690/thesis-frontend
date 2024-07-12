import React, { useEffect, useState } from "react";
import forge from "node-forge";
import z from "zod";

const KeyGeneration = () => {
  const Scheme = z.object({
    publicKey: z.string(),
    privateKey: z.string(),
  });

  type Props = z.infer<typeof Scheme>;

  const [keyPairs, setkeyPairs] = useState<Props | null>(null);

  useEffect(() => {
    const generate = () => {
      forge.pki.rsa.generateKeyPair({ bits: 1024 }, (err, keyPairs) => {
        if (err) {
          console.log("key gen error!");
          return;
        }

        const prvKey = forge.pki.privateKeyToPem(keyPairs.privateKey);
        const pubKey = forge.pki.publicKeyToPem(keyPairs.publicKey);
        const payload: Props = {
          privateKey: prvKey,
          publicKey: pubKey,
        };
        const Check = Scheme.safeParse(payload);
        if (Check.success) setkeyPairs({ ...Check.data });
        console.log("key assign to states...", payload);
      });
    };

    generate();
  }, []);

  return { ...keyPairs };
};

export default KeyGeneration;
