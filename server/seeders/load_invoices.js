//Here the invoices will be loaded to the database 

import fs from 'fs'; //Allow read files
import path from 'path'; //Show current path
import csv from 'csv-parser';
import { pool } from "../connection_db.js";

//Here we exported a function to load invoices to the database
export async function loadInvoicesDb() {
    const filePath = path.resolve('server/data/03_data_invoices.csv'); //File path with csv invoices data
    const invoices = [];

    //Logic to enter invoices data from the CSV file into the database
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row) => {
                invoices.push([
                    row.id_invoice,
                    row.platform_used,
                    row.invoice_number,
                    row.invoive_period,
                    row.amount_paid
                ]);
            })
            .on("end", async () => {
                try {
                    const sql = 'INSERT INTO invoices (id_invoice,platform_used,invoice_number,invoive_period,amount_paid) VALUES ?';
                    const [result] = await pool.query(sql, [invoices]);

            //Confirmation or error messages
                    console.log(`Were inserted ${result.affectedRows} invoices`);
                    resolve();
                } catch (error) {
                    console.error('Error inserting invoices:', error.message);
                    reject(error);
                }
            })
            .on("error", (err) => {
                console.error('Error reading invoices CSV file:', err.message);
                reject(err);
            });

    });
}