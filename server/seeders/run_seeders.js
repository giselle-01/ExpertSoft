//Here all the seeders, or data loading logic, are executed.

//Here are imported all the functions with the loading logic inside.
import {loadCustomersDb} from '../seeders/load_customers.js';
import {loadInvoicesDb} from '../seeders/load_invoices.js';
import {loadTransactionsDb} from '../seeders/load_transactions.js';

//Async arrow function
(async () => {
    try {
        console.log('Starting seeders...');

        //Functions being called
        await loadCustomersDb()
        await loadInvoicesDb()
        await loadTransactionsDb()

        //Confirmation or error messages
        console.log('All seeders executed correctly');
    } catch (error) {
        console.error('Error running seeders:', error.message);

    } finally {
        process.exit();
    }
})()