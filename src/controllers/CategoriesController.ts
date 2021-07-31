import {Request, Response} from 'express';

import categoryModel from '../model/Category';
import Validations from '../validations/categoriesValidations';


class CategoriesController {
    static async create(request: Request, response: Response){
        const { title, color } = request.body;

        try {
            Validations.validateCreate(request.body);
            const id = await categoryModel.insert(request.body);
            return response.status(201).json({id, title, color});
        } catch (error) {
            response.status(400).json({message: error.message});
        }
    }

    static async index(request: Request, response: Response){
        const categories = await categoryModel.getAllCategories();

        return response.status(200).json(categories);
    }

    static async filterCategory(request: Request, response: Response){
        const { id } = request.params;

        try {
            Validations.validateFilter(id);

            const category = await categoryModel.index(id);
    
            if(category){
                return response.status(200).json(category);
            } else {
                return response.status(404).json({message: "category not found"});
            }
        } catch (error) {
            response.status(400).json({message: error.message});
        }

    }

    static async delete(request: Request, response: Response){
        const {id} = request.params;

        try {
            Validations.validateDelete(id);

            const changes = await categoryModel.delete(id);

            if (changes != 0){
                return response.status(200).json({message: 'category deleted'});
            } else {
                return response.status(400).json({message: 'cannot find category with requested id'});
            }
        } catch (error) {
            response.status(400).json({message: error.message});
        }
    }

    static async update(request: Request, response: Response){
        const {id} = request.params;

        try {
            Validations.validateUpdate({...request.body, id});

            const categoryData = await categoryModel.index(id);
    
            if(!categoryData){
                return response.status(400).json({message: 'cannot find category with requested id'});
            }
    
            categoryModel.update({...request.body, id}, categoryData);

            return response.status(201).json({message: 'resource updated'});
        } catch (error) {
            response.status(400).json({message: error.message});
        }
    }

    static async getCategoryVideos(request: Request, response: Response){
        const {id} = request.params;

        const videos = await categoryModel.getCategoryVideos(id);

        return response.status(200).json(videos);
    }
}

export default CategoriesController;