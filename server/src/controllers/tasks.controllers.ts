import db from '../database/connection';
import { Request, Response } from 'express';
export default class TasksController {

    /**
        * @description Listar tarefas
        * @param request - Header
        * @param response - Resposta
        */
    async getTasks(request: Request, response: Response) {
        try {
            const taskState = request.params.state;

            const tasks = await db('tasks')
                .select('tasks.*')
                .orderBy('tasks.id',"desc")
                .modify(queryBuilder => {
                    if (taskState !== "3") {
                        queryBuilder
                            .where('tasks.isActive', '=', taskState)
                    }
                }).then(tasksResult => {

                    return response.status(200).json(tasksResult);
                })

        } catch (error) {
            return response.status(400).json({
                error: error,
                mensagem: 'Erro no sistema, por favor contacte o administrador'
            })
        }


    };


    /**
     * @description Criar uma tarefa
     * @param request - Header
     * @param response - Resposta
     */
    async create(request: Request, response: Response) {
        const trx = await db.transaction();
        const { description } = request.body;
       
        if (description) {
            try {
                await trx('tasks').insert({
                    description
                })

                await trx.commit();

                return response.status(201).send('Criado com sucesso');



                // routes.delete('/tasks', (request, response) => {
                //     console.log(request.query)
                //     return response.json(request.body.id)
                //     })
            } catch (err) {
                await trx.rollback();
                return response.status(400).json({
                    error: err,
                    mensagem: 'Erro no sistema, por favor contacte o administrador'
                })
            }
        }else{
            return response.status(400).send('Coloque uma descrição')
        }
    }

    /**
     * @description Deletar uma tarefa
     * @param request - Header
     * @param response - Resposta
     */
    async delete(request: Request, response: Response) {
        const id = request.params.id
        const trx = await db.transaction();

        if (id) {
            try {
                await trx('tasks').delete().where(
                    'tasks.id', '=', id
                )

                await trx.commit();

                return response.status(201).send('Tarefa excluida com sucesso');

            } catch (err) {
                await trx.rollback();
                return response.status(400).json({
                    error: err,
                    mensagem: 'Erro no sistema, por favor contacte o administrador'
                })
            }
        } else {
            return response.send('É obrigatório passar um ID')
        }
    }

     /**
     * @description Editar uma tarefa
     * @param request - Header
     * @param response - Resposta
     */
    async edit(request: Request, response: Response) {
        const {id, isActive} = request.body
        console.log("TasksController -> edit -> request.query", request.query)
        
        const trx = await db.transaction();

        if (id) {
            try {
                await trx('tasks')
                .where({id}).
                update({isActive})
                
                

                await trx.commit();

                return response.status(201).send('Tarefa editada com sucesso');

            } catch (err) {
                await trx.rollback();
                return response.status(400).json({
                    error: err,
                    mensagem: 'Erro no sistema, por favor contacte o administrador'
                })
            }
        } else {
            return response.send('É obrigatório passar um ID')
        }
    }
}