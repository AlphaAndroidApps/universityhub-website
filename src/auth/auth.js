import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  linkWithCredential
} from "firebase/auth";
import { auth } from "../firebase/firebase";

export const login = async () => {
  const provider = new GoogleAuthProvider();

  try {
    await signInWithPopup(auth, provider);
  } catch (error) {

    if (error.code === "auth/account-exists-with-different-credential") {
      const email = error.customData.email;
      const googleCred = GoogleAuthProvider.credentialFromError(error);

      // Ask password (later replace with modal UI)
      const password = window.prompt(
        "This email already exists. Enter your password to link Google:"
      );

      if (!password) return;

      // Login with email/password
      const userCred = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Link Google to same account
      await linkWithCredential(userCred.user, googleCred);

      alert("Google account successfully linked!");
    } else {
      console.error(error);
      alert(error.message);
    }
  }
};

export const logout = async () => {
  await signOut(auth);
};
