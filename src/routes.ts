import express from 'express';

import VideosController from './controllers/VideosController';
import CategoriesController from './controllers/CategoriesController';

const routes = express.Router();

routes.get('/videos', VideosController.index);
routes.get('/videos/:id', VideosController.filterVideo);

routes.post('/videos', VideosController.create);

routes.delete('/videos/:id', VideosController.delete);

routes.put('/videos/:id', VideosController.update);
routes.patch('/videos/:id', VideosController.update);


routes.get('/categories', CategoriesController.index);
routes.get('/categories/:id', CategoriesController.filterCategory);

routes.post('/categories', CategoriesController.create);

routes.delete('/categories/:id', CategoriesController.delete);

routes.put('/categories/:id', CategoriesController.update);
routes.patch('/categories/:id', CategoriesController.update);


routes.get('/categories/:id/videos/', CategoriesController.getCategoryVideos);

export default routes;