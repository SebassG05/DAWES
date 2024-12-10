import fs from 'fs';
import path from 'path';
import { createNote, editNote, deleteNote } from '../controllers/notesController.js';
import { validationResult } from 'express-validator';

jest.mock('fs');
jest.mock('express-validator');

describe('Notes Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('createNote should create a new note', () => {
        validationResult.mockReturnValue({ isEmpty: () => true });
        const req = { body: { noteName: 'testNote', content: 'testContent' } };
        const res = { send: jest.fn() };

        createNote(req, res);

        expect(fs.writeFileSync).toHaveBeenCalledWith(path.join('./notas', 'testNote.txt'), 'testContent');
        expect(res.send).toHaveBeenCalledWith('Nota creada');
    });

    test('editNote should edit an existing note', () => {
        validationResult.mockReturnValue({ isEmpty: () => true });
        fs.existsSync.mockReturnValue(true);
        const req = { body: { noteName: 'testNote', content: 'newContent' } };
        const res = { send: jest.fn() };

        editNote(req, res);

        expect(fs.writeFileSync).toHaveBeenCalledWith(path.join('./notas', 'testNote.txt'), 'newContent');
        expect(res.send).toHaveBeenCalledWith('Nota editada');
    });

    test('editNote should return 404 if note does not exist', () => {
        validationResult.mockReturnValue({ isEmpty: () => true });
        fs.existsSync.mockReturnValue(false);
        const req = { body: { noteName: 'testNote', content: 'newContent' } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        editNote(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith('Nota no encontrada');
    });

    test('deleteNote should delete an existing note', () => {
        validationResult.mockReturnValue({ isEmpty: () => true });
        fs.existsSync.mockReturnValue(true);
        const req = { body: { noteName: 'testNote' } };
        const res = { send: jest.fn() };

        deleteNote(req, res);

        expect(fs.unlinkSync).toHaveBeenCalledWith(path.join('./notas', 'testNote.txt'));
        expect(res.send).toHaveBeenCalledWith('Nota eliminada');
    });

    test('deleteNote should return 404 if note does not exist', () => {
        validationResult.mockReturnValue({ isEmpty: () => true });
        fs.existsSync.mockReturnValue(false);
        const req = { body: { noteName: 'testNote' } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        deleteNote(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith('Nota no encontrada');
    });

    test('createNote should return validation errors', () => {
        validationResult.mockReturnValue({ isEmpty: () => false, array: () => [{ msg: 'Error' }] });
        const req = { body: {} };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        createNote(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ errors: [{ msg: 'Error' }] });
    });

    test('createNote should handle fs.writeFileSync errors', () => {
        validationResult.mockReturnValue({ isEmpty: () => true });
        fs.writeFileSync.mockImplementation(() => {
            throw new Error('File system error');
        });
        const req = { body: { noteName: 'testNote', content: 'testContent' } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        createNote(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Algo salió mal!');
    });

    test('deleteNote should handle fs.unlinkSync errors', () => {
        validationResult.mockReturnValue({ isEmpty: () => true });
        fs.existsSync.mockReturnValue(true);
        fs.unlinkSync.mockImplementation(() => {
            throw new Error('File system error');
        });
        const req = { body: { noteName: 'testNote' } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        deleteNote(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Algo salió mal!');
    });

    test('editNote should handle fs.writeFileSync errors', () => {
        validationResult.mockReturnValue({ isEmpty: () => true });
        fs.existsSync.mockReturnValue(true);
        fs.writeFileSync.mockImplementation(() => {
            throw new Error('File system error');
        });
        const req = { body: { noteName: 'testNote', content: 'newContent' } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        editNote(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Algo salió mal!');
    });

    test('editNote should handle validation errors', () => {
        validationResult.mockReturnValue({ isEmpty: () => false, array: () => [{ msg: 'Validation error' }] });
        const req = { body: { noteName: 'testNote', content: 'newContent' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        editNote(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ errors: [{ msg: 'Validation error' }] });
    });

    test('deleteNote should handle validation errors', () => {
        validationResult.mockReturnValue({ isEmpty: () => false, array: () => [{ msg: 'Validation error' }] });
        const req = { body: { noteName: 'testNote' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        deleteNote(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ errors: [{ msg: 'Validation error' }] });
    });
});