import fs from 'fs';
import path from 'path';

const notesDir = './notas';

if (!fs.existsSync(notesDir)) {
    fs.mkdirSync(notesDir);
}

export function createNote(req, res) {
    const { noteName, content } = req.body;
    const filePath = path.join(notesDir, `${noteName}.txt`);
    fs.writeFileSync(filePath, content);
    res.send('Nota creada');
}

export function editNote(req, res) {
    const { noteName, content } = req.body;
    const filePath = path.join(notesDir, `${noteName}.txt`);
    if (fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content);
        res.send('Nota editada');
    } else {
        res.status(404).send('Nota no encontrada');
    }
}

export function deleteNote(req, res) {
    const { noteName } = req.body;
    const filePath = path.join(notesDir, `${noteName}.txt`);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        res.send('Nota eliminada');
    } else {
        res.status(404).send('Nota no encontrada');
    }
}