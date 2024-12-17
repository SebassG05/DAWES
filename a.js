
import express from 'express';

import fs from 'fs';

import path from 'path';



const router = express.Router();



router.post('/create', (req, res) => {

    const { noteName, content, category } = req.body;

    if (!noteName) return res.status(400).json({ error: 'noteName is required' });

    if (!content) return res.status(400).json({ error: 'content is required' });

    if (!category) return res.status(400).json({ error: 'category is required' });



    const notePath = path.join(__dirname, `../../notes/${noteName}.json`);

    if (fs.existsSync(notePath)) return res.status(400).json({ error: 'Note already exists' });



    fs.writeFileSync(notePath, JSON.stringify({ content, category }));

    res.status(201).json({ message: 'Nota creada' });

});



router.put('/edit', (req, res) => {

    const { noteName, content, category } = req.body;

    if (!noteName) return res.status(400).json({ error: 'noteName is required' });

    if (!content) return res.status(400).json({ error: 'content is required' });

    if (!category) return res.status(400).json({ error: 'category is required' });



    const notePath = path.join(__dirname, `../../notes/${noteName}.json`);

    if (!fs.existsSync(notePath)) return res.status(404).json({ error: 'Nota no encontrada' });



    try {

        fs.writeFileSync(notePath, JSON.stringify({ content, category }));

        res.status(200).json({ message: 'Nota editada' });

    } catch (error) {

        res.status(500).json({ error: 'Error editing note' });

    }

});



router.delete('/delete', (req, res) => {

    const { noteName } = req.body;

    if (!noteName) return res.status(400).json({ error: 'noteName is required' });



    const notePath = path.join(__dirname, `../../notes/${noteName}.json`);

    if (!fs.existsSync(notePath)) return res.status(404).json({ error: 'Nota no encontrada' });



    try {

        fs.unlinkSync(notePath);

        res.status(200).json({ message: 'Nota eliminada' });

    } catch (error) {

        res.status(500).json({ error: 'Error deleting note' });

    }

});



router.get('/', (req, res) => {

    const { page = 1, limit = 10 } = req.query;

    const notesDir = path.join(__dirname, '../../notes');

    try {

        const files = fs.readdirSync(notesDir);

        const notes = files.slice((page - 1) * limit, page * limit).map(file => {

            const note = JSON.parse(fs.readFileSync(path.join(notesDir, file)));

            return { noteName: path.basename(file, '.json'), ...note };

        });

        res.status(200).json({ notes });

    } catch (error) {

        res.status(500).json({ error: 'Error fetching notes' });

    }

});



export default router;
