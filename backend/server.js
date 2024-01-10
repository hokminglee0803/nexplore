const http = require('http');
const server = http.createServer((req, res) => {

    // GET Method
    if (req.method === 'GET') {
        if (req.url === '/duties') {
            const duties = [
                { id: 1, name: 'Duty 1' },
                { id: 2, name: 'Duty 2' },
                { id: 3, name: 'Duty 3' },
            ];
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(duties));
        }
    }

    // POST Method
    if (req.method === 'POST') {
        if (req.url === '/duty') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Feedback submitted successfully');
        }
    }

    // PUT Method
    if (req.method === 'PUT') {
        if (req.url === '/duty') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Product updated successfully');
        }
    }

    // DELETE Method
    if (req.method === 'DELETE') {
        if (req.url === '/duty') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Product deleted successfully');
        }
    }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});