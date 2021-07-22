import Database from '../database/config';

interface Video {
    id?: string
    title: string,
    description: string,
    url: string
}


class Video {

    static async insert(video: Video){
        const db = await Database();

        const {
            title,
            description,
            url
        } = video;

        const { lastID: id } = await db.run(`INSERT INTO videos (title, description, url) VALUES ('${title}', '${description}', '${url}')`);
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

    static async getAllVideos(){
        const db = await Database();

        const videos = await db.all(`SELECT * FROM videos`);

        await db.close();

        return videos;
    }

    static async update(video: Video, videoData: Video){
        const db = await Database();

        const {title, description, url, id} = video;

        console.log('id: '+ id);

        await db.run(`UPDATE videos SET 
                        title = '${title?title:videoData.title}',
                        description = '${description?description:videoData.description}',
                        url = '${url?url:videoData.url}'
                     WHERE id = ${id}`);


        await db.close();
        
    }

}

export default Video;