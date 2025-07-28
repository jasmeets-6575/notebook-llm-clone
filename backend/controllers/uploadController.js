import { storage } from '../connectDB/firebase.js';

const bucket = storage.bucket();

export async function uploadFile(req, res) {
    if (!req.file) {
        return res.status(400).json({ error: 'No file provided' });
    }

    try {
        const filename = `pdfs/${Date.now()}_${req.file.originalname}`;
        const blob = bucket.file(filename);

        const stream = blob.createWriteStream({
            metadata: { contentType: req.file.mimetype },
        });
        stream.end(req.file.buffer);

        stream.on('finish', async () => {
            await blob.makePublic();
            return res.json({ url: blob.publicUrl() });
        });

        stream.on('error', (err) => {
            console.error('Upload to GCS failed:', err);
        return res.status(500).json({ error: err.message });
    });
    } catch (err) {
        console.error('Unexpected error in upload handler:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
