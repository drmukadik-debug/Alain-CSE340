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

const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
            project_id,
            organization_id,
            title,
            description,
            location,
            date
        FROM service_project
        WHERE organization_id = $1
        ORDER BY date;
    `;

    const queryParams = [organizationId];
    const result = await pool.query(query, queryParams);

    return result.rows;
};

export { getAllProjects, getProjectsByOrganizationId };
