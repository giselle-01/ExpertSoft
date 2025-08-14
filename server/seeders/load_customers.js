//Here the customers will be loaded to the database

import fs from 'fs'; //Allow read files
import path from 'path'; //Show current path
import csv from 'csv-parser';
import { pool } from "../connection_db.js";

//Here we exported a function to load customers to the database
export async function loadCustomersDb() {
    const filePath = path.resolve('server/data/01_data_customers.csv'); //File path with csv customers data
    const customers = [];

    //Logic to enter customers data from the CSV file into the database
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row) => {
                customers.push([
                    row.id_customer,
                    row.customer_name,
                    row.identity,
                    row.address,
                    row.phone,
                    row.email
                ]);
            })
            .on("end", async () => {
                try {
                    const sql = 'INSERT INTO customers (id_customer,customer_name,identity,address,phone,email) VALUES ?';
                    const [result] = await pool.query(sql, [customers]);

            //Confirmation or error messages
                    console.log(`Were inserted ${result.affectedRows} customers`);
                    resolve();
                } catch (error) {
                    console.error('Error inserting customers:', error.message);
                    reject(error);
                }
            })
            .on("error", (err) => {
                console.error('Error reading customers CSV file:', err.message);
                reject(err);
            });

    });
}