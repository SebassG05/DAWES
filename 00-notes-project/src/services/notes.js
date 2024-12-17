import fs from 'fs';
import path from 'path';
import logger from '../utils/logger.js';

const notesDir = path.join(__dirname, '../../notas');

if (!fs.existsSync(notesDir)) {
    fs.mkdirSync(notesDir);
}

export function createNote(noteName, content) {
    try {
        const filePath = path.join(notesDir, `${noteName}.txt`);
        fs.writeFileSync(filePath, content);
        logger.info(`Note created: ${noteName}`);
        return 'Nota creada';
    } catch (error) {
        logger.error(`Error creating note: ${error.message}`);
        throw error;
    }
}

export function editNote(noteName, content) {
    try {
        const filePath = path.join(notesDir, `${noteName}.txt`);
        if (fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, content);
            logger.info(`Note edited: ${noteName}`);
            return 'Nota editada';
        } else {
            throw new Error('Nota no encontrada');
        }
    } catch (error) {
        logger.error(`Error editing note: ${error.message}`);
        throw error;
    }
}

export function deleteNote(noteName) {
    try {
        const filePath = path.join(notesDir, `${noteName}.txt`);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            logger.info(`Note deleted: ${noteName}`);
            return 'Nota eliminada';
        } else {
            throw new Error('Nota no encontrada');
        }
    } catch (error) {
        logger.error(`Error deleting note: ${error.message}`);
        throw error;
    }
}