import nacl from "tweet-nacl-react-native-expo";
import base64 from "base64-js";
import { getFromEncryptedStorage } from "./encryptedStorage";

interface KeyPair {
  publicKey: Uint8Array;
  secretKey: Uint8Array;
}

export const generateKeyPair = async (): Promise<KeyPair | void> => {
  try {
    const keypair = await nacl.sign.keyPair();
    return keypair;
  } catch (e) {
    console.error(e);
  }
};

export const signChallenge = async (
  challenge: string | Uint8Array
): Promise<string | void> => {
  var secretKey, signedChallenge;
  secretKey = await getFromEncryptedStorage("secret");

  // convert to Uint8Array
  if (typeof challenge === "string" && typeof secretKey === "string") {
    challenge = base64.toByteArray(challenge);
    secretKey = base64.toByteArray(secretKey);
  }

  try {
    signedChallenge = await nacl.sign.detached(challenge, secretKey);
    secretKey = secretKey.fill(0);

    return signedChallenge;
  } catch (e) {
    console.error(e);
  }
};
