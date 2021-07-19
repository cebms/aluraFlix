import express from 'express';
import VideosController from './controllers/VideosController';

const routes = express.Router();

routes.get('/videos', VideosController.index);
routes.get('/videos/:id', VideosController.filterVideo);

routes.post('/videos', VideosController.create);

routes.delete('/videos/:id', VideosController.delete);

routes.put('/videos', VideosController.update);
routes.patch('/videos', VideosController.update);


export default routes;