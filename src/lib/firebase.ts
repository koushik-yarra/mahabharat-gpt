import { initializeApp, getApp, getApps, type FirebaseOptions } from 'firebase/app';
import { getDatabase } from 'firebase/database';
// Auth is no longer used here after removing login/registration

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyC5damp_wUCLobmBpnh6tyLc7cUfFSxgn0",
  authDomain: "gita-insights-hhorr.firebaseapp.com",
  databaseURL: "https://gita-insights-hhorr-default-rtdb.firebaseio.com",
  projectId: "gita-insights-hhorr",
  storageBucket: "gita-insights-hhorr.appspot.com", // Corrected format
  messagingSenderId: "74126284214",
  appId: "1:74126284214:web:4c076d66a659b095451d17"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const database = getDatabase(app); 

export { app, database };
