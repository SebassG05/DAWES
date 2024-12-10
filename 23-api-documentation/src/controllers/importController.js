import fs from 'fs';
import path from 'path';

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