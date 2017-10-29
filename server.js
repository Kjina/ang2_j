const http = require('http');
const express = require('express');
const app = express();

const server = http.createServer (function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Http');
}).listen(80);

console.log('Server listen to 80 Port')