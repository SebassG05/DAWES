import request from 'supertest';
import express from 'express';
import notesRouter from '../routes/notes.js';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
jest.mock('fs');
jest.mock('../utils/logger.js');

const app = express();
app.use(express.json());
app.use('/notes', notesRouter);

describe('Notes Controller', () => {
    let token;

    beforeAll(() => {
        process.env.JWT_SECRET = 'test_secret';
        process.env.ADMIN_USERNAME = 'admin';
        token = jwt.sign({ username: process.env.ADMIN_USERNAME }, process.env.JWT_SECRET, { expiresIn: '1h' });
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should create a note', async () => {
        const response = await request(app)
            .post('/notes/create')
            .set('Authorization', `Bearer ${token}`)
            .send({ noteName: 'testNote', content: 'This is a test note', category: 'testCategory' });

        expect(response.status).toBe(201);
        expect(response.text).toBe('Nota creada');
    });

    test('should return 400 if content is missing when creating a note', async () => {
        const response = await request(app)
            .post('/notes/create')
            .set('Authorization', `Bearer ${token}`)
            .send({ noteName: 'testNote', category: 'testCategory' });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('content is required');
    });

    test('should edit a note', async () => {
        fs.existsSync.mockReturnValue(true);
        const response = await request(app)
            .put('/notes/edit')
            .set('Authorization', `Bearer ${token}`)
            .send({ noteName: 'testNote', content: 'This is an edited test note', category: 'testCategory' });

        expect(response.status).toBe(200);
        expect(response.text).toBe('Nota editada');
    });

    test('should return 404 if note to edit does not exist', async () => {
        fs.existsSync.mockReturnValue(false);
        const response = await request(app)
            .put('/notes/edit')
            .set('Authorization', `Bearer ${token}`)
            .send({ noteName: 'nonExistentNote', content: 'This note does not exist', category: 'testCategory' });

        expect(response.status).toBe(404);
        expect(response.text).toBe('Nota no encontrada');
    });

    test('should handle errors when editing a note', async () => {
        fs.existsSync.mockReturnValue(true);
        fs.writeFileSync.mockImplementation(() => {
            throw new Error('Error editing note');
        });

        const response = await request(app)
            .put('/notes/edit')
            .set('Authorization', `Bearer ${token}`)
            .send({ noteName: 'testNote', content: 'This is an edited test note', category: 'testCategory' });

        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Error editing note');
    });

    test('should delete a note', async () => {
        fs.existsSync.mockReturnValue(true);
        const response = await request(app)
            .delete('/notes/delete')
            .set('Authorization', `Bearer ${token}`)
            .send({ noteName: 'testNote' });

        expect(response.status).toBe(200);
        expect(response.text).toBe('Nota eliminada');
    });

    test('should return 404 if note to delete does not exist', async () => {
        fs.existsSync.mockReturnValue(false);
        const response = await request(app)
            .delete('/notes/delete')
            .set('Authorization', `Bearer ${token}`)
            .send({ noteName: 'nonExistentNote' });

        expect(response.status).toBe(404);
        expect(response.text).toBe('Nota no encontrada');
    });

    test('should handle errors when deleting a note', async () => {
        fs.existsSync.mockReturnValue(true);
        fs.unlinkSync.mockImplementation(() => {
            throw new Error('Error deleting note');
        });

        const response = await request(app)
            .delete('/notes/delete')
            .set('Authorization', `Bearer ${token}`)
            .send({ noteName: 'testNote' });

        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Error deleting note');
    });

    test('should get notes', async () => {
        fs.readdirSync.mockReturnValue([]);
        const response = await request(app)
            .get('/notes')
            .set('Authorization', `Bearer ${token}`)
            .query({ page: 1, limit: 10 });

        expect(response.status).toBe(200);
        expect(response.body.notes).toEqual([]);
    });

    test('should handle errors when getting notes', async () => {
        fs.readdirSync.mockImplementation(() => {
            throw new Error('Error fetching notes');
        });

        const response = await request(app)
            .get('/notes')
            .set('Authorization', `Bearer ${token}`)
            .query({ page: 1, limit: 10 });

        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Error fetching notes');
    });

    test('should return 400 if noteName is missing when creating a note', async () => {
        const response = await request(app)
            .post('/notes/create')
            .set('Authorization', `Bearer ${token}`)
            .send({ content: 'This is a test note', category: 'testCategory' });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('noteName is required');
    });

    test('should return 400 if content is missing when creating a note', async () => {
        const response = await request(app)
            .post('/notes/create')
            .set('Authorization', `Bearer ${token}`)
            .send({ noteName: 'testNote', category: 'testCategory' });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('content is required');
    });

    test('should return 400 if category is missing when creating a note', async () => {
        const response = await request(app)
            .post('/notes/create')
            .set('Authorization', `Bearer ${token}`)
            .send({ noteName: 'testNote', content: 'This is a test note' });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('category is required');
    });

    test('should return 400 if noteName is missing when editing a note', async () => {
        const response = await request(app)
            .put('/notes/edit')
            .set('Authorization', `Bearer ${token}`)
            .send({ content: 'This is an edited test note', category: 'testCategory' });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('noteName is required');
    });

    test('should return 400 if content is missing when editing a note', async () => {
        const response = await request(app)
            .put('/notes/edit')
            .set('Authorization', `Bearer ${token}`)
            .send({ noteName: 'testNote', category: 'testCategory' });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('content is required');
    });

    test('should return 400 if category is missing when editing a note', async () => {
        const response = await request(app)
            .put('/notes/edit')
            .set('Authorization', `Bearer ${token}`)
            .send({ noteName: 'testNote', content: 'This is an edited test note' });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('category is required');
    });

    test('should return 400 if noteName is missing when deleting a note', async () => {
        const response = await request(app)
            .delete('/notes/delete')
            .set('Authorization', `Bearer ${token}`)
            .send({});

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('noteName is required');
    });
});