import validUrl from 'valid-url';

import videoModel from '../model/Video';

interface Video {
    id: string
    title: string,
    description: string,
    url: string,
    category: string
}

class Validations {

    static validateId(id: string){
        const idArray = id.split('');

        const filtered = idArray.filter((element) => isNaN(parseInt(element)));

        const newString = filtered.toString().replace(/,/g, '');

        return newString.length===0?true:false;
    }

    static validateFilter(id: string){

        if(!this.validateId(id)){
            return {message: "Id parameter must be a number"};
        }

        if(!id){
            return {message: 'please provide a video id'};
        } else {
            return true;
        }
    }

    static async validateCreate(video: Video){
        const {
            title,
            description,
            url,
            category
        } = video;

        const onlySpacesTitle = title.trim().length === 0;
        const onlySpacesDescription = description.trim().length === 0;

        if(onlySpacesTitle || onlySpacesDescription){
            return {message: 'please input a valid title and description'};
        }

        if(!title || !description || !url){
            return {message: 'please do not leave any empty field'};
        }

        if(!validUrl.isUri(url)){
            return {message: 'please provide a valid URL'};
        }
        
        if(title.length > 100){
            return {message: 'limit of characters for title field is 100'};
        }

        if(category && (!this.validateId(category) || category.trim() == '')){
            return {message: 'category data is invalid'};
        }

        if(category && await videoModel.categoryExists(category) === false){
            return {message: 'category does not exist. Did you create it?'};
        }

        return true;
    }

    static validateDelete(id: string){

        if(!this.validateId(id)){
            return {message: "Id parameter must be a number"};
        }

        if(!id){
            return {message: 'please provide a video id'};
        } else {
            return true;
        }
        
    }

    static validateUpdate(video: Video){
        const {
            id,
            title,
            description,
            url
        } = video;

        if(!this.validateId(id)){
            return {message: "Id parameter must be a number"};
        }

        let onlySpacesTitle = false;

        if(title){
            onlySpacesTitle = title.trim().length === 0;
        }

        let onlySpacesDescription = false;

        if(description){
            onlySpacesDescription = description.trim().length === 0;
        }

        if(onlySpacesTitle || onlySpacesDescription){
            return {message: 'please input a valid title and description'};
        }

        if(url !== undefined && !validUrl.isUri(url)){
            return {message: 'please provide a valid URL'};
        } else {
            return true;
        }
    }
}

export default Validations;