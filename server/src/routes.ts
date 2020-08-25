import express from 'express';
import TasksController from './controllers/tasks.controllers';


const routes = express.Router();

const tasksController = new TasksController();



//tasks -> recursos
//corpo (resquest body) -> dados para criação ou atualização de um registro
//request.body
// Route params: identificar qual recurso eu quero atualizar ou deletar]
//request.param
// quert params: pagiação, filtros, ordenação
// request.query
routes.post('/tasks', tasksController.create);
routes.get('/tasks/:state?', tasksController.getTasks );
routes.delete('/tasks/:id', tasksController.delete);
routes.put('/tasks', tasksController.edit);
export default routes;