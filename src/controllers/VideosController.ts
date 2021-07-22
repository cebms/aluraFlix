import {Request, Response} from 'express';
import validUrl from 'valid-url';

import videoModel from '../model/Video';

class VideosController {
    static async index(request: Request, response: Response){
        const videos = await videoModel.getAllVideos();
        
        return response.status(200).send(videos);
    }

    static async filterVideo(request: Request, response: Response){
        const {id} = request.params;

        if(!id)
            return response.status(400).send({message: 'please provide a video id'});

        const video = await videoModel.index(id);

        if(video){
            return response.status(200).send(video);
        } else {
            return response.status(404).send({message: "video not found"});
        }
    }

    static async create(request: Request, response: Response){
        const {
            title,
            description,
            url
        } = request.body;

        if(!title || !description || !url)
            return response.status(400).send({message: 'please do not leave any empty field'});

        if(!validUrl.isUri(url)){
            return response.status(400).send({message: 'please provide a valid URL'});
        }
        
        if(title.length > 30)
            return response.status(400).send({message: 'limit of characters for title field is 30'});


        const id = await videoModel.insert(request.body);


        return response.status(201).send({id, title, description, url});
    }

    static async delete(request: Request, response: Response) {
        const {id} = request.params;

        if(!id)
            return response.status(400).send({message: 'please provide a video id'})

        const changes = await videoModel.delete(id);

        if (changes != 0){
            return response.status(200).send({message: 'video deleted'});
        } else {
            return response.status(400).send({message: 'cannot find video with requested id'});
        }

    }

    static async update(request:Request, response:Response) {
        const {id} = request.params;
        const {url} = request.body;
        
        if(url !== undefined && !validUrl.isUri(url)){
            return response.status(400).send({message: 'please provide a valid URL'});
        }
        
        const videoData = await videoModel.index(id);

        if(!videoData){
            return response.status(400).send({message: 'cannot find video with requested id'})
        }

        videoModel.update({...request.body, id}, videoData);


        return response.status(201).send({message: 'resource updated'});
    }
}

export default VideosController;