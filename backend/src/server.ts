import http from 'http';
import { Pool } from 'pg';
import 'dotenv/config'

const connectionString = process.env.POSTGRE_SQL_CONNECTION_STRING;

const pool = new Pool({
    connectionString,
})

export const server = http.createServer(async (req, res) => {

    // Handle CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // GET Method
    if (req.method === 'GET') {
        if (req.url === '/duties') {
            pool.connect(function (err, client, done) {
                if (err) {
                    done();
                    handleUnexpectedError(res, `Get duty error : ${err.message}`);
                } else if (client) {
                    client.query("SELECT * FROM DUTIES", function (err, result) {
                        done();
                        if (err) {
                            handleUnexpectedError(res, `Get duty error : ${err.message}`);
                        }
                        console.log('Query Result :', result.rows)
                        sendResponse(res, 200, result.rows)
                    });
                } else {
                    done();
                    handleUnexpectedError(res, "Get duty error : Client is undefined");
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
                let duty: any;
                try {
                    duty = JSON.parse(body);

                    if (!duty['name']) {
                        sendResponse(res, 401, 'Please input "name" in request body');
                    } else {
                        pool.connect(function (err, client, done) {
                            if (err) {
                                handleUnexpectedError(res, `Create duty error : ${err.message}`);
                            } else if (client) {
                                client.query("INSERT INTO DUTIES (name) VALUES ($1)", [duty['name']], function (err) {
                                    done();
                                    if (err) {
                                        handleUnexpectedError(res, `Create duty error : ${err.message}`);
                                    }
                                    console.log(`Duty ${duty['name']} created`)
                                    sendResponse(res, 200, 'Duty created successfully')
                                });
                            } else {
                                done();
                                handleUnexpectedError(res, "Create duty error : Client is undefined");
                            }
                        });
                    }
                } catch (err) {
                    sendResponse(res, 401, 'Invalid Request Body');
                }


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
                return sendResponse(res, 401, 'Invalid duty ID');
            }

            let body = '';

            req.on('data', (chunk) => {
                body += chunk;
            });

            req.on('end', () => {
                let dutyToUpdate: any;
                try {
                    dutyToUpdate = JSON.parse(body);
                } catch (err) {
                    sendResponse(res, 401, 'Invalid Request Body');
                }

                if (!dutyToUpdate['name']) {
                    sendResponse(res, 401, 'Please input "name" in request body');
                } else {
                    pool.connect(function (err, client, done) {
                        if (err) {
                            handleUnexpectedError(res, `Update duty error : ${err.message}`)
                        } else if (client) {
                            client.query("UPDATE DUTIES SET NAME = $1 WHERE ID = $2", [dutyToUpdate['name'], dutyId], function (err) {
                                done()
                                if (err) {
                                    handleUnexpectedError(res, `Update duty error : ${err.message}`)
                                }
                                console.log(`Duty ${dutyId} is updated to ${dutyToUpdate['name']}`)
                                sendResponse(res, 200, 'Duty updated successfully')
                            });
                        } else {
                            done();
                            handleUnexpectedError(res, "Update duty error : Client is undefined");
                        }
                    });
                }


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
                return sendResponse(res, 401, 'Invalid duty ID');
            }
            pool.connect(function (err, client, done) {
                if (err) {
                    handleUnexpectedError(res, `Delete duty error : ${err.message}`);
                } else if (client) {
                    client.query("DELETE FROM DUTIES WHERE ID = $1", [dutyId], function (err) {
                        done();
                        if (err) {
                            handleUnexpectedError(res, `Delete duty error : ${err.message}`);
                        }
                        console.log(`Duty ${dutyId} is deleted`)
                        sendResponse(res, 200, 'Duty deleted successfully')
                    });
                } else {
                    done();
                    handleUnexpectedError(res, "Delete duty error: Client is undefined");
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