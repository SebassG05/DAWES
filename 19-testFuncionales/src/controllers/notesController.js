import fs from 'fs';
import path from 'path';
import { validationResult } from 'express-validator';

const notesDir = './notas';

if (!fs.existsSync(notesDir)) {
    fs.mkdirSync(notesDir);
}

export function createNote(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { noteName, content } = req.body;
    const filePath = path.join(notesDir, `${noteName}.txt`);
    try {
        fs.writeFileSync(filePath, content);
        res.send('Nota creada');
    } catch (error) {
        res.status(500).send('Algo salió mal!');
    }
}

export function editNote(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { noteName, content } = req.body;
    const filePath = path.join(notesDir, `${noteName}.txt`);
    if (fs.existsSync(filePath)) {
        try {
            fs.writeFileSync(filePath, content);
            res.send('Nota editada');
        } catch (error) {
            res.status(500).send('Algo salió mal!');
        }
    } else {
        res.status(404).send('Nota no encontrada');
    }
}

export function deleteNote(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { noteName } = req.body;
    const filePath = path.join(notesDir, `${noteName}.txt`);
    if (fs.existsSync(filePath)) {
        try {
            fs.unlinkSync(filePath);
            res.send('Nota eliminada');
        } catch (error) {
            res.status(500).send('Algo salió mal!');
        }
    } else {
        res.status(404).send('Nota no encontrada');
    }
}