// Practice routing using http module

import http from "http";
const server = http.createServer((req,res)=>{
    res.writeHead(200,{"Content-Type":"text/html"});
    if(req.url==="/"){
        res.end("<h1>Welcome to home page</h1>");
    }
    else if(req.url==="/about"){
        res.end("<h1>Welcome to about page</h1>")
    }
    else if(req.url==="/conatact"){
        res.end("<h1>Welcome to contact page</h1>")
    }
    else{
        res.writeHead(404,{"Content-Type":"text/html"})
        res.end("<h1>404 page not found</h1>")
    }
})
server.listen(3000,()=>{
    console.log("server is running on http://localhost:3000");
})