const pool = require('../db')

const setupDatabase = async (req, res) => {
    try {
        // Create clients table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS clients (
                client_id SERIAL PRIMARY KEY,
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255),
                shop_name VARCHAR(255),
                mobile_no VARCHAR(20),
                email_id VARCHAR(255),
                gst_no VARCHAR(50),
                address TEXT,
                zip_code VARCHAR(10),
                area VARCHAR(100),
                products_purchased integer[],
                purchased_dates timestamp without time zone[],
                joined_on DATE,
                paid BOOLEAN NOT NULL DEFAULT false
            );
        `);

        // Create products table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS products (
                product_id SERIAL PRIMARY KEY,
                product_name VARCHAR(255) NOT NULL,
                description TEXT,
                price NUMERIC(10, 2) NOT NULL,
                category VARCHAR(100),
                stock_quantity INTEGER,
                manufacturer VARCHAR(100),
                release_date DATE,
                is_discontinued BOOLEAN DEFAULT false
            );        
        `);

        await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            user_id SERIAL PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            email VARCHAR(100) NOT NULL,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(20) DEFAULT 'salesman',
            created_at TIMESTAMP DEFAULT current_timestamp,
            updated_at TIMESTAMP DEFAULT current_timestamp
        );
        `)

        res.json({ message: 'Database tables created successfully' })
        console.log('Database tables created successfully.');
    } catch (error) {
        res.json({ message: `Error setting up database: ${error}` })
        console.error('Error setting up database:', error);
    } finally {
        // Close the pool to release resources (if needed)
        // pool.end();
    }
};

module.exports = setupDatabase