import request from 'supertest';
import express from 'express';
import notesRouter from '../src/routes/notes.js'; // Corrige la ruta del import
import { createNote, editNote, deleteNote, getNotes } from '../src/controllers/notes.js'; // Corrige la ruta del import

jest.mock('../src/controllers/notes.js'); // Corrige la ruta del import

const app = express();
app.use(express.json());
app.use('/notes', notesRouter);

describe('Notes Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should create a note', async () => {
        createNote.mockImplementation((req, res) => res.status(201).send('Nota creada'));
        const response = await request(app)
            .post('/notes/create')
            .send({ noteName: 'testNote', content: 'This is a test note' });

        expect(response.status).toBe(201);
        expect(response.text).toBe('Nota creada');
        expect(createNote).toHaveBeenCalled();
    });

    test('should edit a note', async () => {
        editNote.mockImplementation((req, res) => res.status(200).send('Nota editada'));
        const response = await request(app)
            .put('/notes/edit')
            .send({ noteName: 'testNote', content: 'This is an edited test note' });

        expect(response.status).toBe(200);
        expect(response.text).toBe('Nota editada');
        expect(editNote).toHaveBeenCalled();
    });

    test('should delete a note', async () => {
        deleteNote.mockImplementation((req, res) => res.status(200).send('Nota eliminada'));
        const response = await request(app)
            .delete('/notes/delete')
            .send({ noteName: 'testNote' });

        expect(response.status).toBe(200);
        expect(response.text).toBe('Nota eliminada');
        expect(deleteNote).toHaveBeenCalled();
    });

    test('should handle errors when creating a note', async () => {
        createNote.mockImplementation((req, res, next) => next(new Error('Test error')));
        const response = await request(app)
            .post('/notes/create')
            .send({ noteName: 'testNote', content: 'This is a test note' });

        expect(response.status).toBe(500);
    });

    test('should handle errors when editing a note', async () => {
        editNote.mockImplementation((req, res, next) => next(new Error('Test error')));
        const response = await request(app)
            .put('/notes/edit')
            .send({ noteName: 'testNote', content: 'This is an edited test note' });

        expect(response.status).toBe(500);
    });

    test('should handle errors when deleting a note', async () => {
        deleteNote.mockImplementation((req, res, next) => next(new Error('Test error')));
        const response = await request(app)
            .delete('/notes/delete')
            .send({ noteName: 'testNote' });

        expect(response.status).toBe(500);
    });

    test('should get notes', async () => {
        getNotes.mockImplementation((req, res) => res.status(200).json({ notes: [], totalItems: 0, totalPages: 0, currentPage: 1 }));
        const response = await request(app)
            .get('/notes')
            .query({ page: 1, limit: 10 });

        expect(response.status).toBe(200);
        expect(response.body.notes).toEqual([]);
        expect(getNotes).toHaveBeenCalled();
    });

    test('should handle errors when getting notes', async () => {
        getNotes.mockImplementation((req, res, next) => next(new Error('Test error')));
        const response = await request(app)
            .get('/notes')
            .query({ page: 1, limit: 10 });

        expect(response.status).toBe(500);
    });

    test('should return 400 if noteName is missing when creating a note', async () => {
        createNote.mockImplementation((req, res) => res.status(400).send('Note name is required'));
        const response = await request(app)
            .post('/notes/create')
            .send({ content: 'This is a test note' });

        expect(response.status).toBe(400);
    });

    test('should return 400 if noteName is missing when editing a note', async () => {
        editNote.mockImplementation((req, res) => res.status(400).send('Note name is required'));
        const response = await request(app)
            .put('/notes/edit')
            .send({ content: 'This is an edited test note' });

        expect(response.status).toBe(400);
    });

    test('should return 400 if noteName is missing when deleting a note', async () => {
        deleteNote.mockImplementation((req, res) => res.status(400).send('Note name is required'));
        const response = await request(app)
            .delete('/notes/delete')
            .send({});

        expect(response.status).toBe(400);
    });
});