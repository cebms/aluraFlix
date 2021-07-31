import Database from '../database/config';

interface Video {
    id?: string
    title: string,
    description: string,
    url: string,
    category: string
}


class Video {

    static async insert(video: Video){
        const db = await Database();

        const {
            title,
            description,
            url,
            category
        } = video;

        const { lastID: id } = await db.run(`INSERT INTO videos (
            title,
            description,
            url,
            category
            ) VALUES (
            '${title}',
            '${description}',
            '${url}',
            ${category?`'${category}'`:1})
            `);
            
        await db.close();

        return id;
    }

    static async delete(id: string ){
        const db = await Database();

        const {changes} = await db.run(`DELETE FROM videos WHERE id = ${id}`);

        await db.close();

        return changes;
    }

    static async index(id: string){
        const db = await Database();

        const videoData = await db.get(`SELECT * FROM videos WHERE id = ${id}`);

        await db.close();

        return videoData;
    }

    static async getAllVideos(searchTerm: any){
        const db = await Database();


        if(!searchTerm){
            const videos = await db.all(`SELECT * FROM videos`);
            await db.close();
            return videos;
        } else {
            const videos = await db.all(`SELECT * FROM videos WHERE title LIKE '%${searchTerm}%'`);
            await db.close();
            return videos;
        }




    }

    static async update(video: Video, videoData: Video){
        const db = await Database();

        const {title, description, url, id} = video;

        await db.run(`UPDATE videos SET 
                        title = '${title?title:videoData.title}',
                        description = '${description?description:videoData.description}',
                        url = '${url?url:videoData.url}'
                     WHERE id = ${id}`);


        await db.close();
        
    }

    static async categoryExists(category: string){
        const db = await Database();

        const availableCategory = await db.get(`SELECT * FROM categories WHERE id = ${category}`);


        if(availableCategory === undefined){
            return false;
        } else {
            return true;
        }
    }

}

export default Video;