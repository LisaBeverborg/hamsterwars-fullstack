const express = require('express');
const server = express();

const serverPort = process.env.PORT || 1234;

console.log('dirname', __dirname + '/../build');
server.use(express.static(__dirname + '/../build'));

server.get('/api/hamsters', (req, res) => {
    console.log('GET /api', req.url);
    let array = getHamstersFromDatabase();
    res.send(JSON.stringify(array));
})

server.listen(serverPort, () => console.log('Server is listening on port ' + serverPort));

function getHamstersFromDatabase() {
    return [
        { id: 1, name: 'Nils', favFood: 'morot', loves: 'backendprogrammering' },
        { id: 2, name: 'Greta', favFood: 'kål', loves: 'frontendprogrammering' }
    ]
}