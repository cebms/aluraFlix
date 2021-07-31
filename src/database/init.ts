import Database from "./config";

const initDb = {
    async init(){
        const db = await Database();

        
        await db.exec(`CREATE TABLE categories (
            id INTEGER PRIMARY KEY,
            title varchar(20) NOT NULL,
            color varchar(7) NOT NULL
            )`);
            
        await db.exec(`CREATE TABLE videos (
            id INTEGER PRIMARY KEY,
            title VARCHAR(100) NOT NULL,
            description TEXT NOT NULL,
            url TEXT NOT NULL,
            category INTEGER NOT NULL DEFAULT 1,
            FOREIGN KEY(category) REFERENCES categories(id)
        )`);

        await db.run(`INSERT INTO categories 
                (title, color
                ) VALUES ('livre', 
                '#FFFFFF')`);

            await db.close();
    }
    
}

initDb.init();