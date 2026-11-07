
import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './src/database/pool.js';
import { getAllProjects } from './src/models/projects.js';

// Environment configuration
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'development';

// Resolve the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express
const app = express();

// Configure EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', async (req, res) => {
    const title = 'Home';
    res.render('home', { title });
});

// Organizations route
app.get('/organizations', async (req, res) => {
    const title = 'Our Partner Organizations';
    res.render('organizations', { title });
});

// Projects route

// Projects route
app.get('/projects', async (req, res) => {
    const projects = await getAllProjects();

    console.log(projects);

    const title = 'Service Projects';

    res.render('projects', { title, projects });
});


// Categories route
app.get('/categories', async (req, res) => {
    const title = 'Service Project Categories';
    res.render('categories', { title });
});

// Database test route
app.get('/test-db', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT current_database() AS database_name'
        );

        res.json({
            success: true,
            message: 'Connected to PostgreSQL successfully!',
            database: result.rows[0].database_name
        });

    } catch (error) {
        console.error('Database error:', error.message);

        res.status(500).json({
            success: false,
            message: 'Database connection failed'
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
});
