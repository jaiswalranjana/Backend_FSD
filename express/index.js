import express from 'express';
import fs from 'fs';

const app = express();
const PORT = 3000;
app.get('/', (req, res) => {
    fs.readFile('about.html', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
        } else {
            res.setHeader('Content-Type', 'text/html');
            res.send(data);
        }
    });
});
app.get('/about', (req, res) => {
    fs.readFile('about.html', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
        } else {
            res.send(data);
        }
    });
});
app.get('/contact', (req, res) => {
    fs.readFile('contact.html', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
        } else {
            res.send(data);
        }
    });
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});