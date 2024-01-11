import http from 'http';
import { Pool } from 'pg';

const connectionString = 'postgresql://retool:tCb2eGQMaf7d@ep-fragrant-resonance-31213228.us-west-2.retooldb.com/retool?sslmode=require'

const pool = new Pool({
    connectionString,
})

const server = http.createServer(async (req, res) => {

    // GET Method
    if (req.method === 'GET') {
        if (req.url === '/duties') {
            pool.connect(function (err, client, done) {
                if (err) {
                    done();
                    handleUnexpectedError(res, err);
                } else if (client) {
                    client.query("SELECT * FROM DUTIES", function (err, result) {
                        done();
                        if (err) {
                            handleUnexpectedError(res, err);
                        }
                        sendResponse(res, 200, result.rows)
                    });
                } else {
                    done();
                    handleUnexpectedError(res, "Client is undefined");
                }
            });
        } else {
            sendResponse(res, 404, 'API route not found');
        }
    }

    // POST Method
    if (req.method === 'POST') {
        if (req.url === '/duty') {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const duty = JSON.parse(body);

                pool.connect(function (err, client, done) {
                    if (err) {
                        handleUnexpectedError(res, err);
                    } else if (client) {
                        client.query("INSERT INTO DUTIES (name) VALUES ($1)", [duty['name']], function (err) {
                            done();
                            if (err) {
                                handleUnexpectedError(res, err);
                            }
                            sendResponse(res, 200, 'Duty created successfully')
                        });
                    } else {
                        done();
                        handleUnexpectedError(res, "Client is undefined");
                    }
                });
            });
        } else {
            sendResponse(res, 404, 'API route not found');
        }
    }

    // PUT Method
    if (req.method === 'PUT') {
        if (req.url && req.url.startsWith('/duty/')) {
            const dutyId = parseInt(req.url.split('/')[2]);

            if (isNaN(dutyId)) {
                return sendResponse(res, 400, 'Invalid duty ID');
            }

            let body = '';

            req.on('data', (chunk) => {
                body += chunk;
            });

            req.on('end', () => {
                const dutyToUpdate = JSON.parse(body);

                pool.connect(function (err, client, done) {
                    if (err) {
                        handleUnexpectedError(res, err)
                    } else if (client) {
                        client.query("UPDATE DUTIES SET NAME = $1 WHERE ID = $2", [dutyToUpdate['name'], dutyId], function (err) {
                            done()
                            if (err) {
                                handleUnexpectedError(res, err)
                            }
                            sendResponse(res, 200, 'Duty updated successfully')
                        });
                    } else {
                        done();
                        handleUnexpectedError(res, "Client is undefined");
                    }
                });
            });
        } else {
            sendResponse(res, 404, 'API route not found');
        }
    }

    // DELETE Method
    if (req.method === 'DELETE') {
        if (req.url && req.url.startsWith('/duty/')) {
            const dutyId = parseInt(req.url.split('/')[2]);

            if (isNaN(dutyId)) {
                return sendResponse(res, 400, 'Invalid duty ID');
            }
            pool.connect(function (err, client, done) {
                if (err) {
                    handleUnexpectedError(res, err);
                } else if (client) {
                    client.query("DELETE FROM DUTIES WHERE ID = $1", [dutyId], function (err) {
                        done();
                        if (err) {
                            handleUnexpectedError(res, err);
                        }
                        console.log('marxo')
                        sendResponse(res, 200, 'Duty deleted successfully')
                    });
                } else {
                    done();
                    handleUnexpectedError(res, "Client is undefined");
                }
            });
        } else {
            sendResponse(res, 404, 'API route not found');
        }
    }
});

function sendResponse(res: http.ServerResponse<http.IncomingMessage>, statusCode: number, body: string | any[]) {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(body));
}

function handleUnexpectedError(res: http.ServerResponse<http.IncomingMessage>, err: string | Error) {
    console.log(err);
    sendResponse(res, 500, 'Unexpect error occur. Please check with System Administrator');
}

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});