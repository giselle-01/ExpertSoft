//Here goes the connection to the database

import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'admin',
    port: '3306',
    password: 'Qwe.123*',
    database: 'expert_soft',
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
});

async function testDbConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Successful connection to the database');
        connection.release();
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
    }
}
