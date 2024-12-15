import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import logger from '../utils/logger.js';

const notesDir = './notes';

if (!fs.existsSync(notesDir)) {
    fs.mkdirSync(notesDir);
}

export function createNote(req, res, next) {
    try {
        const { noteName, content, category } = req.body;
        if (!noteName) {
            return res.status(400).json({ error: 'noteName is required' });
        }
        if (!content) {
            return res.status(400).json({ error: 'content is required' });
        }
        if (typeof content !== 'string' || content.trim() === '') {
            return res.status(400).json({ error: 'content must be a non-empty string' });
        }
        if (!category) {
            return res.status(400).json({ error: 'category is required' });
        }
        const filePath = path.join(notesDir, `${noteName}.json`);
        const note = {
            noteName,
            content,
            category,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        fs.writeFileSync(filePath, JSON.stringify(note));
        logger.info(`Note created: ${noteName}`);
        res.status(201).send('Nota creada');
    } catch (error) {
        logger.error(`Error creating note: ${error.message}`);
        next({ statusCode: 500, message: 'Error creating note', error: { message: error.message } });
    }
}

export function editNote(req, res, next) {
    try {
        const { noteName, content, category } = req.body;
        if (!noteName) {
            return res.status(400).json({ error: 'noteName is required' });
        }
        if (!content) {
            return res.status(400).json({ error: 'content is required' });
        }
        if (typeof content !== 'string' || content.trim() === '') {
            return res.status(400).json({ error: 'content must be a non-empty string' });
        }
        if (!category) {
            return res.status(400).json({ error: 'category is required' });
        }
        const filePath = path.join(notesDir, `${noteName}.json`);
        if (fs.existsSync(filePath)) {
            const note = JSON.parse(fs.readFileSync(filePath));
            note.content = content;
            note.category = category;
            note.updatedAt = new Date();
            fs.writeFileSync(filePath, JSON.stringify(note));
            logger.info(`Note edited: ${noteName}`);
            res.status(200).send('Nota editada');
        } else {
            res.status(404).send('Nota no encontrada');
        }
    } catch (error) {
        logger.error(`Error editing note: ${error.message}`);
        next({ statusCode: 500, message: 'Error editing note', error: { message: error.message } });
    }
}

export function deleteNote(req, res, next) {
    try {
        const { noteName } = req.body;
        if (!noteName) {
            return res.status(400).json({ error: 'noteName is required' });
        }
        const filePath = path.join(notesDir, `${noteName}.json`);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            logger.info(`Note deleted: ${noteName}`);
            res.status(200).send('Nota eliminada');
        } else {
            res.status(404).send('Nota no encontrada');
        }
    } catch (error) {
        logger.error(`Error deleting note: ${error.message}`);
        next({ statusCode: 500, message: 'Error deleting note', error: { message: error.message } });
    }
}

export function getNotes(req, res, next) {
    try {
        const { sortBy, filterBy, filterValue, page = 1, limit = 10 } = req.query;
        let notes = fs.readdirSync(notesDir).map(file => {
            try {
                return JSON.parse(fs.readFileSync(path.join(notesDir, file)));
            } catch (error) {
                logger.error(`Error parsing note file ${file}: ${error.message}`);
                return null;
            }
        }).filter(note => note !== null);

        // Filtering
        if (filterBy && filterValue) {
            notes = notes.filter(note => {
                if (filterBy === 'title') {
                    return note.noteName.includes(filterValue);
                } else if (filterBy === 'content') {
                    return note.content.includes(filterValue);
                } else if (filterBy === 'category') {
                    return note.category === filterValue;
                } else if (filterBy === 'dateRange') {
                    const [startDate, endDate] = filterValue.split(',');
                    return new Date(note.createdAt) >= new Date(startDate) && new Date(note.createdAt) <= new Date(endDate);
                }
                return true;
            });
        }

        // Sorting
        if (sortBy) {
            notes.sort((a, b) => {
                if (sortBy === 'dateCreated') {
                    return new Date(a.createdAt) - new Date(b.createdAt);
                } else if (sortBy === 'dateUpdated') {
                    return new Date(a.updatedAt) - new Date(b.updatedAt);
                } else if (sortBy === 'title') {
                    return a.noteName.localeCompare(b.noteName);
                } else if (sortBy === 'size') {
                    return a.content.length - b.content.length;
                }
                return 0;
            });
        }

        // Pagination
        const totalItems = notes.length;
        const totalPages = Math.ceil(totalItems / limit);
        const paginatedNotes = notes.slice((page - 1) * limit, page * limit);

        res.status(200).json({
            totalItems,
            totalPages,
            currentPage: page,
            notes: paginatedNotes,
        });
    } catch (error) {
        logger.error(`Error fetching notes: ${error.message}`);
        next({ statusCode: 500, message: 'Error fetching notes', error: { message: error.message } });
    }
}

export function importNotes(req, res, next) {
    try {
        const files = req.files;
        if (!files || files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }

        files.forEach(file => {
            const filePath = path.join(notesDir, file.originalname);
            fs.renameSync(file.path, filePath);
            logger.info(`Note imported: ${file.originalname}`);
        });

        res.status(200).send('Notas importadas');
    } catch (error) {
        logger.error(`Error importing notes: ${error.message}`);
        next({ statusCode: 500, message: 'Error importing notes', error: { message: error.message } });
    }
}

export function exportNotes(req, res, next) {
    try {
        const { filterBy, filterValue } = req.query;
        let notes = fs.readdirSync(notesDir).map(file => {
            try {
                return {
                    name: file,
                    content: fs.readFileSync(path.join(notesDir, file)),
                };
            } catch (error) {
                logger.error(`Error reading note file ${file}: ${error.message}`);
                return null;
            }
        }).filter(note => note !== null);

        // Filtering
        if (filterBy && filterValue) {
            notes = notes.filter(note => {
                const noteContent = JSON.parse(note.content);
                if (filterBy === 'title') {
                    return noteContent.noteName.includes(filterValue);
                } else if (filterBy === 'content') {
                    return noteContent.content.includes(filterValue);
                } else if (filterBy === 'category') {
                    return noteContent.category === filterValue;
                } else if (filterBy === 'dateRange') {
                    const [startDate, endDate] = filterValue.split(',');
                    return new Date(noteContent.createdAt) >= new Date(startDate) && new Date(noteContent.createdAt) <= new Date(endDate);
                }
                return true;
            });
        }

        const archive = archiver('zip', {
            zlib: { level: 9 }
        });

        res.attachment('notes.zip');

        archive.on('error', (err) => {
            throw err;
        });

        archive.pipe(res);

        notes.forEach(note => {
            archive.append(note.content, { name: note.name });
        });

        archive.finalize();
    } catch (error) {
        logger.error(`Error exporting notes: ${error.message}`);
        next({ statusCode: 500, message: 'Error exporting notes', error: { message: error.message } });
    }
}