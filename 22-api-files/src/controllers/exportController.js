import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

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