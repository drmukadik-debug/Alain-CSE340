
import pool from '../database/pool.js';

const getAllProjects = async () => {
    const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.location,
            TO_CHAR(p.date, 'YYYY-MM-DD') AS project_date,
            o.name AS organization_name
        FROM service_project p
        INNER JOIN organization o
            ON p.organization_id = o.organization_id
        ORDER BY p.project_id;
    `;

    const result = await pool.query(query);

    return result.rows;
};

export { getAllProjects };
