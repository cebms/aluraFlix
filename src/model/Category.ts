import Database from "../database/config";

interface Category {
    id: string,
    title: string,
    color: string
}

class Category {
    static async insert(category: Category){
        const db = await Database();
        const { title, color } = category;
        
        const { lastID: id } = await db.run(`INSERT INTO categories (title, color) VALUES ('${title}', '${color}')`);

        await db.close();

        return id;
    }

    static async getAllCategories(){
        const db = await Database();

        const videos = await db.all(`SELECT * FROM categories`);

        await db.close();

        return videos;
    }

    static async index(id: string){
        const db = await Database();

        const category = await db.get(`SELECT * FROM categories WHERE id = ${id}`);

        await db.close();

        return category;
    }

    static async delete(id: string){
        const db = await Database();

        const {changes} = await db.run(`DELETE FROM categories WHERE id = ${id}`);

        await db.close();

        return changes;
    }

    static async update(category: Category, categoryData: Category){
        const { title, color, id } = category;


        const db = await Database();

        await db.run(`UPDATE categories SET 
                title = '${title?title:categoryData.title}',
                color = '${color?color:categoryData.color}'
                WHERE id = ${id}`);

        await db.close();

    }

    static async getCategoryVideos(categoryId: string){
        const db = await Database();

        const videos = await db.all(`SELECT
            videos.id, 
            videos.title, 
            videos.description, 
            videos.url, 
            videos.category, 
            categories.title AS categoryTitle, 
            categories.color 
            FROM videos INNER JOIN 
            categories ON videos.category = categories.id 
            WHERE videos.category = ${categoryId}`);

        await db.close();

        return videos;
    }
}

export default Category;