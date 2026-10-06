import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html");

    // Student Form
    if (req.url === "/" && req.method === "GET") {
        res.end(`
            <h1>Student Form</h1>
            <form action="/submit" method="POST">
                Name: <input name="name"><br><br>
                Roll No: <input name="roll"><br><br>
                Course: <input name="course"><br><br>
                Email: <input name="email"><br><br>
                <button>Add Student</button>
            </form>
            <br><a href="/students">View Students</a>
        `);
    }

    // Save Data
    else if (req.url === "/submit" && req.method === "POST") {
        let data = "";

        req.on("data", chunk => data += chunk);

        req.on("end", () => {
            let student = Object.fromEntries(new URLSearchParams(data));

            let students = fs.existsSync("students.json")
                ? JSON.parse(fs.readFileSync("students.json"))
                : [];

            students.push(student);

            fs.writeFileSync("students.json", JSON.stringify(students));

            res.end("<h1>Student Added!</h1><a href='/'>Go Back</a>");
        });
    }

    // Display Students
    else if (req.url === "/students") {
        let students = fs.existsSync("students.json")
            ? JSON.parse(fs.readFileSync("students.json"))
            : [];

        res.end(`
            <h1>Student Records</h1>
            ${students.map(s =>
                `<p>Name: ${s.name}<br>
                Roll: ${s.roll}<br>
                Course: ${s.course}<br>
                Email: ${s.email}</p><hr>`
            ).join("")}
        `);
    }
});

server.listen(30000, () => {
    console.log("Server running on port 30000");
});