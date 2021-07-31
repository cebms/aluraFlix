import {Request, Response} from 'express';

import Validations from '../validations/videoValidations';
import videoModel from '../model/Video';

class VideosController {
    static async index(request: Request, response: Response){
        const { search } = request.query;

        const videos = await videoModel.getAllVideos(search);
        
        return response.status(200).json(videos);
    }

    static async filterVideo(request: Request, response: Response){
        const {id} = request.params;

        try {
            Validations.validateFilter(id);

            const video = await videoModel.index(id);

            if(video){
                return response.status(200).json(video);
            } else {
                return response.status(404).json({message: "video not found"});
            }

        } catch (error) {
            response.status(400).json({message: error.message});
        }
    }

    static async create(request: Request, response: Response){
        const {
            title,
            description,
            url,
            category
        } = request.body;

        try {
            await Validations.validateCreate(request.body);
            const id = await videoModel.insert(request.body);
            return response.status(201).json({id, title, description, url, category});
        } catch (error) {
            response.status(400).json({message: error.message});
        }
        
    }

    static async delete(request: Request, response: Response) {
        const {id} = request.params;

        try {
            Validations.validateDelete(id);

            const changes = await videoModel.delete(id);
    
            if (changes != 0){
                return response.status(200).json({message: 'video deleted'});
            } else {
                return response.status(400).json({message: 'cannot find video with requested id'});
            }
        } catch (error) {
            return response.status(400).json({message: error.message});
        }


    }

    static async update(request:Request, response:Response) {
        const {id} = request.params;

        try {
            Validations.validateUpdate({...request.body, id});

            const videoData = await videoModel.index(id);
    
            if(!videoData){
                return response.status(400).json({message: 'cannot find video with requested id'});
            }
    
            videoModel.update({...request.body, id}, videoData);

            return response.status(201).json({message: 'resource updated'});
        } catch (error) {
            response.status(400).json({message: error.message});
        }
        
    }
}

export default VideosController;