import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const PORT = 3000;


// __dirname equivalent in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Path of requests.json
const filePath = path.join(__dirname, "requests.json");


// Middleware
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));


// Read requests from JSON file
function getRequests() {

    const data = fs.readFileSync(filePath, "utf-8");

    return JSON.parse(data);
}


// Save requests to JSON file
function saveRequests(requests) {

    fs.writeFileSync(
        filePath,
        JSON.stringify(requests, null, 2)
    );
}


// ===============================
// GET ALL REQUESTS
// ===============================

app.get("/api/requests", (req, res) => {

    const requests = getRequests();

    res.json(requests);
});


// ===============================
// GET REQUEST BY ID
// ===============================

app.get("/api/requests/:id", (req, res) => {

    const requests = getRequests();

    const id = Number(req.params.id);

    const request = requests.find(
        r => r.id === id
    );


    if (!request) {

        return res.status(404).json({
            message: "Request not found"
        });

    }


    res.json(request);
});


// ===============================
// POST - ADD REQUEST
// ===============================

app.post("/api/requests", (req, res) => {

    const requests = getRequests();


    const newRequest = {

        id: Date.now(),

        studentName: req.body.studentName,

        email: req.body.email,

        category: req.body.category,

        description: req.body.description,

        priority: req.body.priority

    };


    requests.push(newRequest);


    saveRequests(requests);


    res.status(201).json(newRequest);
});


// ===============================
// PUT - UPDATE REQUEST
// ===============================

app.put("/api/requests/:id", (req, res) => {

    const requests = getRequests();

    const id = Number(req.params.id);


    const index = requests.findIndex(
        r => r.id === id
    );


    if (index === -1) {

        return res.status(404).json({
            message: "Request not found"
        });

    }


    requests[index] = {

        id: id,

        studentName: req.body.studentName,

        email: req.body.email,

        category: req.body.category,

        description: req.body.description,

        priority: req.body.priority

    };


    saveRequests(requests);


    res.json(requests[index]);
});


// ===============================
// DELETE REQUEST
// ===============================

app.delete("/api/requests/:id", (req, res) => {

    const requests = getRequests();

    const id = Number(req.params.id);


    const newRequests = requests.filter(
        r => r.id !== id
    );


    if (newRequests.length === requests.length) {

        return res.status(404).json({
            message: "Request not found"
        });

    }


    saveRequests(newRequests);


    res.json({
        message: "Request deleted successfully"
    });

});


// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});