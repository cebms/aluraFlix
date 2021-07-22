import express from 'express';
import VideosController from './controllers/VideosController';

const routes = express.Router();

routes.get('/videos', VideosController.index);
routes.get('/videos/:id', VideosController.filterVideo);

routes.post('/videos', VideosController.create);

routes.delete('/videos/:id', VideosController.delete);

routes.put('/videos/:id', VideosController.update);
routes.patch('/videos/:id', VideosController.update);


export default routes;