
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const context = typeof window === 'undefined' ? 'SERVER' : 'CLIENT';

console.log(`--- Firebase Init (${context}) ---`);

const rawApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const rawAuthDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
const rawProjectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const rawStorageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
const rawMessagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
const rawAppId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;
const rawDatabaseURL = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;

console.log(`RAW NEXT_PUBLIC_FIREBASE_API_KEY (${context}):`, rawApiKey);
console.log(`RAW NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN (${context}):`, rawAuthDomain);
console.log(`RAW NEXT_PUBLIC_FIREBASE_PROJECT_ID (${context}):`, rawProjectId);
console.log(`RAW NEXT_PUBLIC_FIREBASE_DATABASE_URL (${context}):`, rawDatabaseURL); // Pay close attention to this line

const firebaseConfig = {
  apiKey: rawApiKey,
  authDomain: rawAuthDomain,
  projectId: rawProjectId,
  storageBucket: rawStorageBucket,
  messagingSenderId: rawMessagingSenderId,
  appId: rawAppId,
  databaseURL: rawDatabaseURL,
};

console.log(`Constructed firebaseConfig (${context}):`);
console.log(`  API Key: ${firebaseConfig.apiKey ? 'Exists' : 'MISSING or undefined'}`);
console.log(`  Auth Domain: ${firebaseConfig.authDomain}`);
console.log(`  Project ID: ${firebaseConfig.projectId}`);
console.log(`  Storage Bucket: ${firebaseConfig.storageBucket}`);
console.log(`  Messaging Sender ID: ${firebaseConfig.messagingSenderId}`);
console.log(`  App ID: ${firebaseConfig.appId}`);
console.log(`  Database URL: ${firebaseConfig.databaseURL}`); // And this line in the constructed object

if (!firebaseConfig.databaseURL || typeof firebaseConfig.databaseURL !== 'string' || !firebaseConfig.databaseURL.startsWith('https://')) {
  const errorPrefix = `[FIREBASE_CONFIG_ERROR (${context})]`;
  const errorMessage = `${errorPrefix} databaseURL is invalid or missing. Current value from environment variable: "${rawDatabaseURL}", Value in config: "${firebaseConfig.databaseURL}". Please ensure NEXT_PUBLIC_FIREBASE_DATABASE_URL in your .env.local file is correctly set (e.g., "https://your-project-id-default-rtdb.firebaseio.com") and RESTART your development server.`;
  console.error(errorMessage);
  // This explicit check happens before Firebase's own check.
  // If you see this error, the problem is definitively with the NEXT_PUBLIC_FIREBASE_DATABASE_URL.
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const database = getDatabase(app); // This is where the error originates if databaseURL is bad

export { app, auth, database };
