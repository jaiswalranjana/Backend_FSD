import http from "http";

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html");
    
    if (req.url === "/") {
        res.writeHead(200);
        res.end("<h1>Welcome to my college page</h1>");
    } 
    else if (req.url === "/home") {
        res.writeHead(200);
        res.end("<h1>Home page</h1>");
    } 
    else if (req.url === "/about") {
        res.writeHead(200);
        res.end("<h1>About computer science department</h1>");
    } 
    else {
        res.writeHead(404);
        res.end("<h1>404 - page not found</h1>");
    }
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});