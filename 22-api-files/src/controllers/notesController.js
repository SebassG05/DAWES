import { validationResult } from 'express-validator';
import { saveNote, getNote, updateNote, deleteNoteFile, getAllNotes } from '../models/noteModel.js';
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

export function createNote(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { noteName, content } = req.body;
    try {
        saveNote(noteName, content);
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
    if (getNote(noteName)) {
        try {
            updateNote(noteName, content);
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
    if (getNote(noteName)) {
        try {
            deleteNoteFile(noteName);
            res.send('Nota eliminada');
        } catch (error) {
            res.status(500).send('Algo salió mal!');
        }
    } else {
        res.status(404).send('Nota no encontrada');
    }
}

export function getNotes(req, res) {
    const { sortBy, order, filter, page = 1, limit = 10 } = req.query;
    let notes = getAllNotes();

    if (filter) {
        notes = notes.filter(note => note.noteName.includes(filter) || note.content.includes(filter));
    }

    if (sortBy) {
        notes.sort((a, b) => {
            if (sortBy === 'title') {
                return order === 'desc' ? b.noteName.localeCompare(a.noteName) : a.noteName.localeCompare(b.noteName);
            } else if (sortBy === 'createdAt' || sortBy === 'updatedAt') {
                return order === 'desc' ? new Date(b[sortBy]) - new Date(a[sortBy]) : new Date(a[sortBy]) - new Date(b[sortBy]);
            } else if (sortBy === 'size') {
                return order === 'desc' ? b.size - a.size : a.size - b.size;
            }
            return 0;
        });
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedNotes = notes.slice(startIndex, endIndex);

    res.json({
        total: notes.length,
        page,
        limit,
        notes: paginatedNotes
    });
}

export function importNotes(req, res) {
    const files = req.files;
    if (!files) {
        return res.status(400).send('No files were uploaded.');
    }

    files.forEach(file => {
        const filePath = path.join('./notas', file.originalname);
        const content = fs.readFileSync(filePath, 'utf-8');
        const note = {
            noteName: path.basename(file.originalname, '.note'),
            content,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            size: Buffer.byteLength(content, 'utf8')
        };
        fs.writeFileSync(path.join('./notas', `${note.noteName}.json`), JSON.stringify(note));
        fs.unlinkSync(filePath); // Remove the .note file after processing
    });

    res.send('Files imported successfully.');
}

export function exportNotes(req, res) {
    const { filter } = req.query;
    const notesDir = './notas';
    const files = fs.readdirSync(notesDir);
    const notes = files.map(file => {
        try {
            return JSON.parse(fs.readFileSync(path.join(notesDir, file), 'utf-8'));
        } catch (error) {
            console.error(`Error parsing JSON from file ${file}:`, error);
            return null;
        }
    }).filter(note => note !== null);

    let filteredNotes = notes;
    if (filter) {
        filteredNotes = notes.filter(note => note.noteName.includes(filter) || note.content.includes(filter));
    }

    const zip = archiver('zip');
    res.attachment('notes.zip');
    zip.pipe(res);

    filteredNotes.forEach(note => {
        const filePath = path.join(notesDir, `${note.noteName}.json`);
        zip.append(fs.createReadStream(filePath), { name: `${note.noteName}.note` });
    });

    zip.finalize();
}