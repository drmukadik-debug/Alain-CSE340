import pool from '../database/pool.js';

// Get all categories
const getAllCategories = async () => {
    const query = `
        SELECT
            category_id,
            category_name
        FROM category
        ORDER BY category_id;
    `;

    const result = await pool.query(query);
    return result.rows;
};

// Get a single category by ID
const getCategoryById = async (categoryId) => {
    const query = `
        SELECT
            category_id,
            category_name
        FROM category
        WHERE category_id = $1;
    `;

    const queryParams = [categoryId];
    const result = await pool.query(query, queryParams);

    return result.rows[0];
};

// Get categories associated with a specific service project
const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT
            c.category_id,
            c.category_name
        FROM category c
        INNER JOIN service_project_category spc
            ON c.category_id = spc.category_id
        WHERE spc.project_id = $1
        ORDER BY c.category_name;
    `;

    const queryParams = [projectId];
    const result = await pool.query(query, queryParams);

    return result.rows;
};

// Get service projects associated with a specific category
const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.location,
            p.date,
            p.organization_id
        FROM service_project p
        INNER JOIN service_project_category spc
            ON p.project_id = spc.project_id
        WHERE spc.category_id = $1
        ORDER BY p.date ASC;
    `;

    const queryParams = [categoryId];
    const result = await pool.query(query, queryParams);

    return result.rows;
};

// Export model functions
export {
    getAllCategories,
    getCategoryById,
    getCategoriesByProjectId,
    getProjectsByCategoryId
};
