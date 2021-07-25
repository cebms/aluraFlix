import Database from "./config";

const initDb = {
    async init(){
        const db = await Database();

        await db.exec(`CREATE TABLE videos (
            id INTEGER PRIMARY KEY,
            title VARCHAR(100) NOT NULL,
            description TEXT NOT NULL,
            url TEXT NOT NULL
        )`);
        
        await db.close();
    }
    
}

initDb.init();