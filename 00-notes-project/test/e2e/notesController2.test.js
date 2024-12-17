import { createNote, editNote, deleteNote, getNotes, importNotes, exportNotes } from '../../src/controllers/notes.js';
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import logger from '../../src/utils/logger.js';

jest.mock('fs');
jest.mock('archiver');
jest.mock('../../src/utils/logger.js');

describe('Notes Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = { body: {}, query: {}, files: [] };
        res = { status: jest.fn().mockReturnThis(), json: jest.fn(), send: jest.fn(), attachment: jest.fn() };
        next = jest.fn();
        jest.clearAllMocks();
    });

    describe('createNote', () => {
        test('should return 400 if noteName is missing', () => {
            req.body = { content: 'test content', category: 'testCategory' };
            createNote(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'noteName is required' });
        });

        test('should return 400 if content is missing', () => {
            req.body = { noteName: 'testNote', category: 'testCategory' };
            createNote(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'content is required' });
        });

        test('should return 400 if content is not a non-empty string', () => {
            req.body = { noteName: 'testNote', content: '', category: 'testCategory' };
            createNote(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'content is required' });
        });

        test('should return 400 if category is missing', () => {
            req.body = { noteName: 'testNote', content: 'test content' };
            createNote(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'category is required' });
        });

        test('should handle errors when creating a note', () => {
            req.body = { noteName: 'testNote', content: 'test content', category: 'testCategory' };
            fs.writeFileSync.mockImplementation(() => {
                throw new Error('Error creating note');
            });
            createNote(req, res, next);
            expect(next).toHaveBeenCalledWith(expect.objectContaining({ statusCode: 500, message: 'Error creating note' }));
        });
    });

    describe('editNote', () => {
        test('should return 400 if noteName is missing', () => {
            req.body = { content: 'test content', category: 'testCategory' };
            editNote(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'noteName is required' });
        });

        test('should return 400 if content is missing', () => {
            req.body = { noteName: 'testNote', category: 'testCategory' };
            editNote(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'content is required' });
        });

        test('should return 400 if content is not a non-empty string', () => {
            req.body = { noteName: 'testNote', content: '', category: 'testCategory' };
            editNote(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'content is required' });
        });

        test('should return 400 if category is missing', () => {
            req.body = { noteName: 'testNote', content: 'test content' };
            editNote(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'category is required' });
        });

        test('should handle errors when editing a note', () => {
            req.body = { noteName: 'testNote', content: 'test content', category: 'testCategory' };
            fs.writeFileSync.mockImplementation(() => {
                throw new Error('Error editing note');
            });
            editNote(req, res, next);
            expect(next).toHaveBeenCalledWith(expect.objectContaining({ statusCode: 500, message: 'Error editing note' }));
        });
    });

    describe('deleteNote', () => {
        test('should return 400 if noteName is missing', () => {
            req.body = {};
            deleteNote(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'noteName is required' });
        });

        test('should handle errors when deleting a note', () => {
            req.body = { noteName: 'testNote' };
            fs.unlinkSync.mockImplementation(() => {
                throw new Error('Error deleting note');
            });
            deleteNote(req, res, next);
            expect(next).toHaveBeenCalledWith(expect.objectContaining({ statusCode: 500, message: 'Error deleting note' }));
        });

        test('should delete note successfully', () => {
            req.body = { noteName: 'testNote' };
            fs.existsSync.mockReturnValue(true);
            fs.unlinkSync.mockImplementation(() => {});
            deleteNote(req, res, next);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith('Nota eliminada');
        });
    });

    describe('importNotes', () => {
        test('should return 400 if no files are uploaded', () => {
            req.files = [];
            importNotes(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'No files uploaded' });
        });

        test('should handle errors when importing notes', () => {
            req.files = [{ path: 'tempPath', originalname: 'testNote.json' }];
            fs.renameSync.mockImplementation(() => {
                throw new Error('Error importing notes');
            });
            importNotes(req, res, next);
            expect(next).toHaveBeenCalledWith(expect.objectContaining({ statusCode: 500, message: 'Error importing notes' }));
        });

        test('should import notes successfully', () => {
            req.files = [{ path: 'tempPath', originalname: 'testNote.json' }];
            fs.renameSync.mockImplementation(() => {});
            importNotes(req, res, next);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith('Notas importadas');
        });
    });

    describe('exportNotes', () => {
        test('should handle errors when exporting notes', () => {
            fs.readdirSync.mockImplementation(() => {
                throw new Error('Error exporting notes');
            });
            exportNotes(req, res, next);
            expect(next).toHaveBeenCalledWith(expect.objectContaining({ statusCode: 500, message: 'Error exporting notes' }));
        });

        test('should export notes successfully', () => {
            const archiveMock = { append: jest.fn(), finalize: jest.fn(), pipe: jest.fn(), on: jest.fn() };
            archiver.mockReturnValue(archiveMock);
            fs.readdirSync.mockReturnValue(['testNote.json']);
            fs.readFileSync.mockReturnValue('test file content');

            exportNotes(req, res, next);

            expect(res.attachment).toHaveBeenCalledWith('notes.zip');
            expect(archiveMock.append).toHaveBeenCalledWith('test file content', { name: 'testNote.json' });
            expect(archiveMock.finalize).toHaveBeenCalled();
        });
    });

    describe('getNotes', () => {
        test('should return 400 if page is missing', () => {
            req.query = { limit: 10 };
            getNotes(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'page is required' });
        });

        test('should return 400 if limit is missing', () => {
            req.query = { page: 1 };
            getNotes(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'limit is required' });
        });

        test('should handle errors when fetching notes', () => {
            fs.readdirSync.mockImplementation(() => {
                throw new Error('Error fetching notes');
            });
            getNotes(req, res, next);
            expect(next).toHaveBeenCalledWith(expect.objectContaining({ statusCode: 500, message: 'Error fetching notes' }));
        });

        test('should get notes successfully', () => {
            fs.readdirSync.mockReturnValue(['testNote.json']);
            fs.readFileSync.mockReturnValue(JSON.stringify({ noteName: 'testNote', content: 'test file content', category: 'testCategory', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }));
            getNotes(req, res, next);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                totalItems: 1,
                totalPages: 1,
                currentPage: 1,
                notes: [{ noteName: 'testNote', content: 'test file content', category: 'testCategory', createdAt: expect.any(String), updatedAt: expect.any(String) }],
            });
        });
    });
});

