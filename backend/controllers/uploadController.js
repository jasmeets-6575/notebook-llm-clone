import { firebaseStorageBucket, firestoreDB } from '../connectDB/firebase.js';
import firebaseAdmin from '../connectDB/firebase.js';

export async function uploadFile(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'No file provided' });
  }

  try {
    const originalName = req.file.originalname;
    const mimeType     = req.file.mimetype;
    const fileBuffer   = req.file.buffer;

    const filename = `pdfs/${Date.now()}_${originalName}`;
    const blob = firebaseStorageBucket.file(filename);

    const uploadToStorage = () =>
      new Promise((resolve, reject) => {
        const stream = blob.createWriteStream({ metadata: { contentType: mimeType } });

        stream.on('finish', resolve);
        stream.on('error', reject);
        stream.end(fileBuffer);
      });

    await uploadToStorage();
    await blob.makePublic();

    const fileUrl = blob.publicUrl();

    const docRef = await firestoreDB.collection('uploaded_pdfs').add({
      name: originalName,
      url: fileUrl,
      uploadedAt: firebaseAdmin.firestore.FieldValue.serverTimestamp(), // ✅ Best practice
    });

    return res.status(200).json({ url: fileUrl, firestoreId: docRef.id });
  } catch (err) {
    console.error("❌ Upload failed:", err);
    return res.status(500).json({ error: err.message || "Internal error" });
  }
}
