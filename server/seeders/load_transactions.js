//Here the transactions will be loaded to the database 

import fs from 'fs'; //Allow read files
import path from 'path'; //Show current path
import csv from 'csv-parser';
import { pool } from "../connection_db.js";

//Here we exported a function to load transactions to the database
export async function loadtransactionsDb() {
    const filePath = path.resolve('server/data/03_data_transactions.csv'); //File path with csv transactions data
    const transactions = [];

    //Logic to enter transactions data from the CSV file into the database
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row) => {
                transactions.push([
                    row.id_transaction,
                    row.id_customer,
                    row.id_invoice,
                    row.date_and_time,
                    row.amount
                ]);
            })
            .on("end", async () => {
                try {
                    const sql = 'INSERT INTO transactions (id_transaction,id_customer,id_invoice,date_and_time,amount) VALUES ?';
                    const [result] = await pool.query(sql, [transactions]);

            //Confirmation or error messages
                    console.log(`Were inserted ${result.affectedRows} transactions`);
                    resolve();
                } catch (error) {
                    console.error('Error inserting transactions:', error.message);
                    reject(error);
                }
            })
            .on("error", (err) => {
                console.error('Error reading transactions CSV file:', err.message);
                reject(err);
            });

    });
}