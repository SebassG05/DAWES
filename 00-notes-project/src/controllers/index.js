import { createNote, editNote, deleteNote } from './notes.js';

export function handleCreateNote(req, res) {
    createNote(req.body)
        .then(note => res.status(201).json(note))
        .catch(err => res.status(500).json({ error: err.message }));
}

export function handleEditNote(req, res) {
    editNote(req.params.id, req.body)
        .then(note => {
            if (note) {
                res.status(200).json(note);
            } else {
                res.status(404).json({ message: 'Note not found' });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
}

export function handleDeleteNote(req, res) {
    deleteNote(req.params.id)
        .then(deleted => {
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Note not found' });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
}