import {Request, Response} from 'express';

import Validations from '../validations/videoValidations';
import videoModel from '../model/Video';

class VideosController {
    static async index(request: Request, response: Response){
        const videos = await videoModel.getAllVideos();
        
        return response.status(200).json(videos);
    }

    static async filterVideo(request: Request, response: Response){
        const {id} = request.params;

        const isValid = Validations.validateFilter(id);

        if(isValid === true){
            const video = await videoModel.index(id);

            if(video){
                return response.status(200).json(video);
            } else {
                return response.status(404).json({message: "video not found"});
            }
        } else {
            return response.status(400).json(isValid);
        }
    }

    static async create(request: Request, response: Response){
        const {
            title,
            description,
            url,
            category
        } = request.body;

        const isValid = await Validations.validateCreate(request.body);

        if(isValid === true){
            const id = await videoModel.insert(request.body);
            return response.status(201).json({id, title, description, url, category});
        } else {
            return response.status(400).json(isValid);
        }
        
    }

    static async delete(request: Request, response: Response) {
        const {id} = request.params;

        const isValid = Validations.validateDelete(id)

        if(isValid === true){
            const changes = await videoModel.delete(id);
    
            if (changes != 0){
                return response.status(200).json({message: 'video deleted'});
            } else {
                return response.status(400).json({message: 'cannot find video with requested id'});
            }
        } else {
            return response.status(400).json(isValid);
        }


    }

    static async update(request:Request, response:Response) {
        const {id} = request.params;

        const isValid = Validations.validateUpdate({...request.body, id});

        if(isValid === true){
            const videoData = await videoModel.index(id);
    
            if(!videoData){
                return response.status(400).json({message: 'cannot find video with requested id'});
            }
    
            videoModel.update({...request.body, id}, videoData);

            return response.status(201).json({message: 'resource updated'});

        } else {
            return response.status(400).json(isValid);
        }
        
    }
}

export default VideosController;