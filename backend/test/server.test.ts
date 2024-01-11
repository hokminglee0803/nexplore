import { server } from '../src/server';
import request from 'supertest';

describe('API Tests', () => {

    beforeAll(done => {
        done()
    })

    afterAll(done => {
        server.close();
        done()
    })

    it('should return 404 for unknown API route in GET Method', async () => {
        const response = await request(server).get('/unknown-route');

        expect(response.status).toBe(404);
        expect(response.body).toBe('API route not found');
    });

    it('should return 404 for unknown API route in POST Method', async () => {
        const response = await request(server).post('/unknown-route');

        expect(response.status).toBe(404);
        expect(response.body).toBe('API route not found');
    });

    it('should return 404 for unknown API route in PUT Method', async () => {
        const response = await request(server).put('/unknown-route');

        expect(response.status).toBe(404);
        expect(response.body).toBe('API route not found');
    });

    it('should return 404 for unknown API route in DELETE Method', async () => {
        const response = await request(server).delete('/unknown-route');

        expect(response.status).toBe(404);
        expect(response.body).toBe('API route not found');
    });

    it('should get all duties with status 200', async () => {
        const response = await request(server).get('/duties');
        expect(response.status).toBe(200);
    }, 10000);

    it('should return 401 for empty request body in creating duty', async () => {
        const response = await request(server)
            .post('/duty')
            .send({}); // Empty request body

        expect(response.status).toBe(401);
        expect(response.body).toBe('Please input "name" in request body');
    });


    it('should return 401 for empty request body in updating duty', async () => {
        const response = await request(server)
            .put('/duty/0')
            .send({}); // Empty request body

        expect(response.status).toBe(401);
        expect(response.body).toBe('Please input "name" in request body');
    });

    it('should return 401 for invalid id in updating duty', async () => {
        const response = await request(server)
            .put('/duty/impossible-id')
            .send({
                name: "example-name"
            });

        expect(response.status).toBe(401);
        expect(response.body).toBe('Invalid duty ID');
    });

    it('should return 401 for empty path id in updating duty', async () => {
        const response = await request(server)
            .put('/duty/')
            .send({
                name: "impossible-name"
            });

        expect(response.status).toBe(401);
        expect(response.body).toBe('Invalid duty ID');
    });

    it('should return 401 for invalid id in deleting duty', async () => {
        const response = await request(server)
            .delete('/duty/impossible-id')
            .send({
                name: "example-name"
            });

        expect(response.status).toBe(401);
        expect(response.body).toBe('Invalid duty ID');
    });

    it('should return 401 for empty path id in deleting duty', async () => {
        const response = await request(server)
            .delete('/duty/')
            .send({
                name: "impossible-name"
            });

        expect(response.status).toBe(401);
        expect(response.body).toBe('Invalid duty ID');
    });

});