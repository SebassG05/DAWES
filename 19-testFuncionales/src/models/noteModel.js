import fs from 'fs';
import path from 'path';

const notesDir = './notas';

if (!fs.existsSync(notesDir)) {
    fs.mkdirSync(notesDir);
}

export function saveNote(noteName, content) {
    const filePath = path.join(notesDir, `${noteName}.txt`);
    fs.writeFileSync(filePath, content);
}

export function getNote(noteName) {
    const filePath = path.join(notesDir, `${noteName}.txt`);
    if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, 'utf-8');
    }
    return null;
}

export function deleteNoteFile(noteName) {
    const filePath = path.join(notesDir, `${noteName}.txt`);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
}