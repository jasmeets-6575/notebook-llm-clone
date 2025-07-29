import firebaseAdmin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.FIREBASE_SERVICE_APP_CONFIG) {
	throw new Error('Internal Error: FIREBASE_SERVICE_APP_CONFIG missing.');
}

if (!process.env.FIREBASE_STORAGE_BUCKET) {
	throw new Error('Internal Error: FIREBASE_STORAGE_BUCKET missing.');
}

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_APP_CONFIG);

try {
	firebaseAdmin.initializeApp({
		credential: firebaseAdmin.credential.cert(serviceAccount)
	});
	console.log('Firebase admin Initialized.');
} catch (error) {
	// Skipping the "already exists" message which is not an actual error when we're hot-reloading.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	if (!/already exists/u.test((error)?.message)) {
		console.error('Firebase admin initialization error : ', error);
	}
}

// Accessing the firestore and storage services
export const firestoreDB = firebaseAdmin.firestore();
firestoreDB.settings({ databaseId: "notebookllm" })
export const firebaseStorageBucket = firebaseAdmin.storage().bucket(process.env.FIREBASE_STORAGE_BUCKET);

export default firebaseAdmin;