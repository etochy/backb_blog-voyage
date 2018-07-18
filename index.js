const PORT = process.env.PORT || 5000;
const express = require('express');
const app = express();

app.get('/', function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
 })

app.get('/test', function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('test');
})

const server = app.listen(PORT, function () {
    console.log(`Server running on ${PORT}/`);
})