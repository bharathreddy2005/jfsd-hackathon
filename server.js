import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 8080; // Port number for the server

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mentorship_db',
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

// SignUp Endpoint
app.post('/api/signup', (req, res) => {
    const { name, email, password } = req.body;
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, password], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: 'Error creating account' });
        }
        res.status(201).json({ message: 'Account created successfully' });
    });
});

// Login Endpoint
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ message: 'Login failed' });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const user = results[0];
        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            token: 'dummy-token', // Replace with a real JWT in production
        });
    });
});

// Dashboard Endpoint
app.get('/api/dashboard', (req, res) => {
    const data = {
        courses: ['Course 1', 'Course 2', 'Course 3'],
        sessions: ['Session 1', 'Session 2', 'Session 3'],
    };
    res.json(data);
});

// Start the Server
// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Access the server on port: ${PORT}`);
});
