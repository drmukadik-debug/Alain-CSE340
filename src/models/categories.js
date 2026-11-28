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

// Assign a category to a service project
const assignCategoryToProject = async (projectId, categoryId) => {
    const query = `
        INSERT INTO service_project_category (project_id, category_id)
        VALUES ($1, $2);
    `;

    await pool.query(query, [projectId, categoryId]);
};

// Update category assignments for a service project
const updateCategoryAssignments = async (projectId, categoryIds) => {
    const deleteQuery = `
        DELETE FROM service_project_category
        WHERE project_id = $1;
    `;

    await pool.query(deleteQuery, [projectId]);

    for (const categoryId of categoryIds) {
        await assignCategoryToProject(projectId, categoryId);
    }
};

// Export model functions
export {
    getAllCategories,
    getCategoryById,
    getCategoriesByProjectId,
    getProjectsByCategoryId,
    updateCategoryAssignments
};