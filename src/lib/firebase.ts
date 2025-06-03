/**
 * @fileOverview Firebase initialization and configuration.
 * This file sets up the Firebase app instance and exports Firebase services
 * like Realtime Database. It uses hardcoded configuration values.
 *
 * IMPORTANT SECURITY NOTE:
 * Hardcoding credentials directly into source code is NOT recommended for production.
 * This setup is primarily for ease of development and debugging in this specific environment.
 * For production applications, use environment variables (e.g., from a .env.local file,
 * not committed to version control) and ensure your hosting environment is configured
 * securely to provide these variables.
 */
import { initializeApp, getApp, getApps, type FirebaseOptions } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Hardcoded Firebase configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyC5damp_wUCLobmBpnh6tyLc7cUfFSxgn0",
  authDomain: "gita-insights-hhorr.firebaseapp.com",
  databaseURL: "https://gita-insights-hhorr-default-rtdb.firebaseio.com",
  projectId: "gita-insights-hhorr",
  storageBucket: "gita-insights-hhorr.appspot.com", // Standard format for storage bucket
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


// Validate Database URL before initializing
if (!firebaseConfig.databaseURL || 
    !(firebaseConfig.databaseURL.startsWith("https://") && 
      (firebaseConfig.databaseURL.endsWith(".firebaseio.com") || firebaseConfig.databaseURL.endsWith(".firebasedatabase.app"))
    )
   ) {
  const errorPrefix = `[FIREBASE_CONFIG_ERROR (${context})]`;
  const errorMessage = `${errorPrefix} databaseURL is invalid or missing in hardcoded config. Current value: "${firebaseConfig.databaseURL}". Please ensure it's correctly set (e.g., "https://your-project-id-default-rtdb.firebaseio.com").`;
  console.error(errorMessage);
  // Potentially throw an error here if critical for app functionality,
  // or let Firebase SDK handle it if it's a non-critical scenario.
  // For now, we'll let Firebase SDK attempt initialization and potentially fail.
}


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services
// Note: Auth is not initialized here as login/registration was removed.
// If other Firebase services are needed, they can be initialized here.
const database = getDatabase(app); 

export { app, database };
