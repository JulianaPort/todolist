import React, { useState, FormEvent, useEffect } from 'react';
import api from '../../services/api';

import { Header } from '../../components/header';
import { Input } from '../../components/input';
import { TaskState } from '../../shared/enum/taskState';

import { Tarefas } from '../tarefas';

import './style.css';


interface Tasks {
    id: number,
    description: string,
    isActive: any
}

const Home = () => {


    const [state, setState] = useState(TaskState.all)
    const [description, setDescription] = useState('')
    const [tasks, setTasks] = useState([])



    const handleTaskState = (prop: number) => {
        if (prop !== state) {
            setState(prop);
        }

    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { getTasks() }, [state]);

    function handleCreatTask(e: FormEvent) {
        e.preventDefault();

        api.post('/tasks', { description }).then(
        ).catch(error => window.alert(error))

    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    async function getTasks() {
        const tarefas = await api.get('/tasks/' + state);
        setTasks(tarefas.data);
    }

    function TaskStateCompleted(props: { add: boolean }) {
        if (state === TaskState.completed && !props.add) {
            return (
                <div className="btn-delete">
                    <button>
                        <i className="fas fa-trash">
                            <span>delete all</span>
                        </i>
                    </button>
                </div>
            )
        } else if ( props.add) {
            return (<div>
                <Input name="task" placeholder="add detail" value={description}
                    onChange={(e) => setDescription(e.target.value)} />
                <button type="submit"> Add </button>
            </div>
            )
        } else {
            return <div></div>
        }
    }

    return (

        <div >
            <header>
                <Header />
            </header>
            <form onSubmit={handleCreatTask} className="home-todo">
                <nav>
                    <button
                        value={TaskState.all}
                        type="button"
                        onClick={() => handleTaskState(TaskState.all)}
                        className={state === TaskState.all ? 'activated' : ''}
                    >
                        All
                    </button>
                    <button
                        value={TaskState.active}
                        type="button"
                        onClick={() => handleTaskState(TaskState.active)}
                        className={state === TaskState.active ? 'activated' : ''}
                    >
                        Active
                         </button>
                    <button
                        value={TaskState.completed}
                        type="button"
                        onClick={() => handleTaskState(TaskState.completed)}
                        className={state === TaskState.completed ? 'activated' : ''}
                    >
                        Completed
                    </button>
                </nav>
                <section>
                <TaskStateCompleted add = {true}/>
                </section>
                <main>
                    {tasks.map((task: Tasks) => {
                        return <Tarefas key={task.id} task={task} menuTaskState={state}/>
                    })
                    }

                </main>
                <TaskStateCompleted add = {false}/>

            </form>

        </div>

    )
}

export default Home;