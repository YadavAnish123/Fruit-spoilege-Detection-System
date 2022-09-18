import { getDatabase, onValue, ref, get, child } from "firebase/database";
import { app } from "./firebase";

export const db = getDatabase(app);
