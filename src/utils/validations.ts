import {Response} from 'express';
import validUrl from 'valid-url';

interface Video {
    id?: string
    title: string,
    description: string,
    url: string
}

class Validations {
    static validateFilter(id: string, response: Response){
        if(!id){
            response.status(400).send({message: 'please provide a video id'});
            return false;
        } else {
            return true;
        }
    }

    static validateCreate(video: Video, response: Response){
        const {
            title,
            description,
            url
        } = video;

        if(!title || !description || !url){
            response.status(400).send({message: 'please do not leave any empty field'});
            return false;
        }

        if(!validUrl.isUri(url)){
            response.status(400).send({message: 'please provide a valid URL'});
            return false;
        }
        
        if(title.length > 100){
            response.status(400).send({message: 'limit of characters for title field is 30'});
            return false;
        }

        return true;
    }

    static validateDelete(id: string, response: Response){
        if(!id){
            response.status(400).send({message: 'please provide a video id'});
            return false;
        } else {
            return true;
        }
    }

    static validateUpdate(url: string, response: Response){
        if(url !== undefined && !validUrl.isUri(url)){
            response.status(400).send({message: 'please provide a valid URL'});
            return false;
        } else {
            return true;
        }
    }
}

export default Validations;