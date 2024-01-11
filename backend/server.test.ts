import { server } from '../server';
import http from 'http';


describe('API Tests', () => {
    let testServer: http.Server;

    beforeAll((done) => {
        testServer = server.listen(8080, done);
    });

    afterAll((done) => {
        testServer.close(done);
    });

    it('should update duty name when the duty exists', (done) => {
        const options = {
            hostname: 'localhost',
            port: 8080,
            path: '/duty/2',
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const req = http.request(options, (res) => {
            expect(res.statusCode).toBe(200);
            // Additional assertions if needed
            done();
        });

        const updatedDuty = {
            name: 'Updated Duty Name',
        };

        req.write(JSON.stringify(updatedDuty));
        req.end();
    });

});