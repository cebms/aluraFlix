import {Request, Response} from 'express';

import Database from '../database/config';

class VideosController {
    static async index(request: Request, response: Response){
        const db = await Database();
        const videos = await db.all(`SELECT * FROM videos`);
        return response.status(200).send(videos);
    }

    static async filterVideo(request: Request, response: Response){
        const {id} = request.params;
        const db = await Database();
        const video = await db.get(`SELECT * FROM videos WHERE id = ${id}`);

        if(video){
            return response.status(200).send(video);
        } else {
            return response.status(404).send({message: "video not found"});
        }
    }

    static async create(request: Request, response: Response){
        const db = await Database();
        const {
            title,
            description,
            url
        } = request.body;

        const {lastID: id} = await db.run(`INSERT INTO videos (title, description, url) VALUES ('${title}', '${description}', '${url}')`);


        return response.status(201).send({id, title, description, url});
    }

    static async delete(request: Request, response: Response) {
        const {id} = request.params;
        const db = await Database();

        const {changes} = await db.run(`DELETE FROM videos WHERE id = ${id}`);

        if (changes != 0){
            return response.status(200).send({message: 'video deleted'});
        } else {
            return response.status(400).send({message: 'cannot find video with requested id'});
        }

    }

    static async update(request:Request, response:Response) {
        const {id, title, description, url} = request.body;
        const db = await Database();

        if(!id)
            return response.status(400).send({message: 'please provide a video id'});

        const videoData = await db.get(`SELECT * FROM videos WHERE id = ${id}`);

        if(!videoData){
            return response.status(400).send({message: 'cannot find video with requested id'})
        }


        await db.run(`UPDATE videos SET 
                        title = '${title?title:videoData.title}',
                        description = '${description?description:videoData.description}',
                        url = '${url?url:videoData.url}'
                     WHERE id = ${id}`);

        return response.status(201).send({message: 'resource updated'});
    }
}

export default VideosController;