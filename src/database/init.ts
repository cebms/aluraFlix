import Database from "./config";

const initDb = {
    async init(){
        const db = await Database();

        await db.exec(`CREATE TABLE videos (
            id INTEGER PRIMARY KEY,
            title TEXT,
            description TEXT,
            url TEXT
        )`);
        
        await db.close();
    }
    
}

initDb.init();