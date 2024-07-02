"use client";
import { auth, db } from "./firebase";
import { getDoc } from "firebase/firestore";

import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";

const doesUsernameExist = async (username) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("username", "==", username));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

export const doCreateUserWithEmailAndPassword = async (
  email,
  password,
  username
) => {
  const usernameTaken = await doesUsernameExist(username);
  if (usernameTaken) {
    throw new Error("Username already taken");
  }

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  await saveUserData(user.uid, username, email);
  return user;
};

async function saveUserData(userId, username, email) {
  try {
    const userDocRef = doc(db, "users", userId);
    await setDoc(userDocRef, {
      username: username,
      email: email,
    });
  } catch (error) {
    throw error;
  }
}

export const getUserData = async (uid) => {
  const userRef = doc(db, "users", uid);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("User document not found");
  }
};

export const doSignInWithEmailAndPassword = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result;
};

export const doSignOut = () => {
  return auth.signOut();
};
