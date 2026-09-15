
const http = require('http');
const fs = require('fs');

const PORT = 3000;
const FILE = 'students.json';

function getStudents() {
    if (!fs.existsSync(FILE)) {
        fs.writeFileSync(FILE, '[]');
    }

    const data = fs.readFileSync(FILE, 'utf8');
    return JSON.parse(data);
}

function saveStudent(student) {
    const students = getStudents();
    students.push(student);
    fs.writeFileSync(FILE, JSON.stringify(students, null, 2));
}

function homePage() {
    return `
<!DOCTYPE html>
<html>
<head>
    <title>Student Records</title>
</head>
<body>
    <h1>Student Records</h1>

    <form action="/add" method="POST">
        <label>Student Name</label>
        <input type="text" name="name" required>
        <br><br>

        <label>Roll Number</label>
        <input type="text" name="roll" required>
        <br><br>

        <label>Course</label>
        <input type="text" name="course" required>
        <br><br>

        <label>Email</label>
        <input type="email" name="email" required>
        <br><br>

        <button type="submit">Add Student</button>
    </form>

    <br>
    <a href="/students">View Students</a>
</body>
</html>
`;
}

function studentsPage() {
    const students = getStudents();

    let rows = '';

    students.forEach(student => {
        rows += `
        <tr>
            <td>${student.name}</td>
            <td>${student.roll}</td>
            <td>${student.course}</td>
            <td>${student.email}</td>
        </tr>
        `;
    });

    return `
<!DOCTYPE html>
<html>
<head>
    <title>All Students</title>
</head>
<body>
    <h1>Student Records</h1>

    <table border="1" cellpadding="10">
        <tr>
            <th>Name</th>
            <th>Roll Number</th>
            <th>Course</th>
            <th>Email</th>
        </tr>
        ${rows}
    </table>

    <br>
    <a href="/">Add Student</a>
</body>
</html>
`;
}

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(homePage());
    }

    else if (req.url === '/students' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(studentsPage());
    }

    else if (req.url === '/add' && req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const data = new URLSearchParams(body);

            const student = {
                name: data.get('name'),
                roll: data.get('roll'),
                course: data.get('course'),
                email: data.get('email')
            };

            saveStudent(student);

            res.writeHead(302, { Location: '/students' });
            res.end();
        });
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});