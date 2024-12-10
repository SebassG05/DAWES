import fs from 'fs';
import path from 'path';

const notesDir = './notas';

if (!fs.existsSync(notesDir)) {
    fs.mkdirSync(notesDir);
}

export function saveNote(noteName, content) {
    const filePath = path.join(notesDir, `${noteName}.json`);
    const note = {
        noteName,
        content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        size: Buffer.byteLength(content, 'utf8')
    };
    fs.writeFileSync(filePath, JSON.stringify(note));
}

export function getNote(noteName) {
    const filePath = path.join(notesDir, `${noteName}.json`);
    if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    return null;
}

export function updateNote(noteName, content) {
    const filePath = path.join(notesDir, `${noteName}.json`);
    if (fs.existsSync(filePath)) {
        const note = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        note.content = content;
        note.updatedAt = new Date().toISOString();
        note.size = Buffer.byteLength(content, 'utf8');
        fs.writeFileSync(filePath, JSON.stringify(note));
    }
}

export function deleteNoteFile(noteName) {
    const filePath = path.join(notesDir, `${noteName}.json`);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
}

export function getAllNotes() {
    const files = fs.readdirSync(notesDir);
    return files.map(file => {
        try {
            return JSON.parse(fs.readFileSync(path.join(notesDir, file), 'utf-8'));
        } catch (error) {
            console.error(`Error parsing JSON from file ${file}:`, error);
            return null;
        }
    }).filter(note => note !== null);
}