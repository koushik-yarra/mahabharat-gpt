
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Hardcoded Firebase configuration provided by the user
// IMPORTANT SECURITY NOTE:
// Hardcoding credentials here is NOT recommended for production.
// These values were provided for debugging. For a real application,
// use environment variables (e.g., from a .env.local file)
// and ensure they are configured securely in your hosting environment.
const firebaseConfig = {
  apiKey: "AIzaSyC5damp_wUCLobmBpnh6tyLc7cUfFSxgn0",
  authDomain: "gita-insights-hhorr.firebaseapp.com",
  databaseURL: "https://gita-insights-hhorr-default-rtdb.firebaseio.com",
  projectId: "gita-insights-hhorr",
  storageBucket: "gita-insights-hhorr.appspot.com", // Standard format
  messagingSenderId: "74126284214",
  appId: "1:74126284214:web:4c076d66a659b095451d17"
};

const context = typeof window === 'undefined' ? 'SERVER' : 'CLIENT';

console.log(`--- Firebase Init (${context}) ---`);
console.log(`Using hardcoded firebaseConfig (${context}):`);
console.log(`  API Key: ${firebaseConfig.apiKey ? 'Exists' : 'MISSING or undefined'}`);
console.log(`  Auth Domain: ${firebaseConfig.authDomain}`);
console.log(`  Project ID: ${firebaseConfig.projectId}`);
console.log(`  Storage Bucket: ${firebaseConfig.storageBucket}`);
console.log(`  Messaging Sender ID: ${firebaseConfig.messagingSenderId}`);
console.log(`  App ID: ${firebaseConfig.appId}`);
console.log(`  Database URL: ${firebaseConfig.databaseURL}`);

if (!firebaseConfig.databaseURL || !firebaseConfig.databaseURL.startsWith("https://") || !firebaseConfig.databaseURL.endsWith(".firebaseio.com") && !firebaseConfig.databaseURL.endsWith(".firebasedatabase.app")) {
  const errorPrefix = `[FIREBASE_CONFIG_ERROR (${context})]`;
  const errorMessage = `${errorPrefix} databaseURL is invalid or missing. Current value from config: "${firebaseConfig.databaseURL}". Please ensure it's correctly set (e.g., "https://your-project-id-default-rtdb.firebaseio.com").`;
  console.error(errorMessage);
  // Potentially throw an error here if critical, or let Firebase SDK handle it
}


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const database = getDatabase(app); 

export { app, database };
