import pool from '../database/pool.js';

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

export { getAllCategories };