
import pool from './src/database/pool.js';

try {
    const result = await pool.query(
        'SELECT NOW() AS current_time, current_database() AS database_name'
    );

    console.log('Connexion PostgreSQL réussie !');
    console.log('Base de données :', result.rows[0].database_name);
    console.log('Heure du serveur :', result.rows[0].current_time);
} catch (error) {
    console.error('Erreur de connexion PostgreSQL :', error.message);
} finally {
    await pool.end();
}
