import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

import path from 'path';

const Database = () => {
    return open({
            filename: path.resolve(__dirname, 'database.sqlite'),
            driver: sqlite3.Database
    })
}



export default Database;
