import React, { useState } from 'react';

import './style.css';
import { TaskState } from '../../shared/enum/taskState';
import api from '../../services/api';
interface Tasks {
    task: {
        description: string,
        isActive: any,
        id: number
    },
    menuTaskState: number
}
export const Tarefas: React.FC<Tasks> = (props: Tasks) => {

    const [task, setTask] = useState(props.task)

    function CanDeleteTask(taskProps: any) {
        if (taskProps.taskState === TaskState.completed && props.menuTaskState === TaskState.completed) {
            return (
                <div className="btn-delete">
                    <i className="fas fa-trash"></i>
                </div>
            );
        }
        else {
            return <i></i>
        }
    }



    async function editTask() {
        let taskToUpdate = { ...task }
        taskToUpdate.isActive = taskToUpdate.isActive === 0 ? 1 : 0;
        setTask(taskToUpdate)
        await api.put('/tasks', taskToUpdate);
    }




    return (
        <div className="list-tasks">
            <main >
                <input type="checkbox"
                    id={props.task.id + ''}
                    checked={task.isActive === TaskState.completed ? true : false}
                    // eslint-disable-next-line eqeqeq
                    onChange={() => editTask()}
                />
                <label className={task.isActive === TaskState.completed ? 'completed' : ''}
                    htmlFor={task.id + ''}>
                    {task.description}
                </label>
            </main>
            <CanDeleteTask taskState={task.isActive} />
        </div>

    )
}