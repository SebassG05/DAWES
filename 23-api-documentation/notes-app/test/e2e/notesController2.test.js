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

