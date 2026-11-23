import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './src/database/pool.js';
import router from './src/routes.js';

// Environment configuration
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'development';

// Resolve the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express
const app = express();

// Middleware to parse form data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Middleware to log all incoming requests
app.use((req, res, next) => {
    if (NODE_ENV === 'development') {
        console.log(`${req.method} ${req.url}`);
    }
    next(); // Pass control to the next middleware or route
});

// Middleware to make NODE_ENV available to all templates
app.use((req, res, next) => {
    res.locals.NODE_ENV = NODE_ENV;
    next();
});
// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

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

// Use the imported router to handle application routes
app.use(router);

// Catch-all route for 404 errors
app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

// Global error handler
app.use((err, req, res, next) => {
    // Log error details for debugging
    console.error('Error occurred:', err.message);
    console.error('Stack trace:', err.stack);

    // Determine status and template
    const status = err.status || 500;
    const template = status === 404 ? '404' : '500';

    // Prepare data for the template
    const context = {
        title: status === 404 ? 'Page Not Found' : 'Server Error',
        error: err.message,
        stack: err.stack
    };

    // Render the appropriate error template
    res.status(status).render(`errors/${template}`, context);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
});
