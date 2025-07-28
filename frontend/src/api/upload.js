// src/api/upload.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export async function uploadPDF(file, onProgress) {
    const form = new FormData();
    form.append('file', file);

    const res = await axios.post(`${API_URL}/upload`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (evt) => {
        if (onProgress && evt.total) {
        const pct = Math.round((evt.loaded * 100) / evt.total);
        onProgress(pct);
        }
        },
    });

    return res.data;
}
