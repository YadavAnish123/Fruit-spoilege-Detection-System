// Importing configuration for the firebase
import { firebaseConfig } from "./firebase-config";

// Importing firebase services
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import {
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  collection,
} from "@firebase/firestore";
import { getAuth } from "@firebase/auth";

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);

export const handler = async (data) => {
  const emailRef = collection(firestore, "users");

  try {
    const res = await addDoc(emailRef, data);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const fetchHandler = async () => {
  const userRef = collection(firestore, "users");

  try {
    let docs = await getDocs(userRef);
    let users = [];

    docs.docs.forEach((item) => {
      let data = item._document.data.value.mapValue.fields;
      const fid = item.id;
      users.push({ ...data, fieldID: fid });
    });
    return users;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const deleteHandler = async (id) => {
  const docRef = doc(firestore, "users", id);
  try {
    const res = await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const mailString = async () => {
  const users = await fetchHandler();
  let mailstring = "";

  if (users) {
    users.map((user) => {
      if (mailstring === "") mailstring = user.email.stringValue;
      else mailstring = mailstring.concat(", ", user.email.stringValue);
    });
  }

  return mailstring;
};
