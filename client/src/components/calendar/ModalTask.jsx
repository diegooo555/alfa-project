import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { deleteTaskRequest, getTasksRequest, updateTaskRequest } from '../../api/tasks'
import {useForm} from 'react-hook-form'

const WindowQuestion = ({setWindowQuestion, deleteTask, id}) => {
    return(
        <div className='w-screen h-screen fixed top-0 left-0 z-10 grid'>
            <div className='h-[30%] w-[30%] self-center justify-self-center flex flex-col justify-center items-center bg-white gap-2'>
                <p>¿Deseas eliminar la tarea?</p>
                <div className='flex justify-around items-center w-full'>
                    <button onClick={() => {
                        deleteTask(id)
                        setWindowQuestion(false)
                    }} className='p-2 bg-red-500 w-[20%] rounded-md'>Si</button>
                    <button onClick={() => setWindowQuestion(false)} className='p-2 bg-blue-400 w-[20%] rounded-md'>No</button>
                </div>
            </div>
        </div>
    )
}

function ModalTask({taskModal, setTaskModal, tasks, setTasksUser}) {
    const task = taskModal[1]
    const [title, setTitle] = useState(task.title)
    const [description, setDescription] = useState(task.description)
    const [dateStart, setDateStart] = useState(task.dateStart)
    const [dateEnd, setDateEnd] = useState(task.dateEnd)
    const [windowQuestion, setWindowQuestion] = useState(false)
    const {register, handleSubmit} = useForm()

    const deleteTask = async (id) => {
        try {
            const res = await deleteTaskRequest(id) 
            if(res.status === 204 ) setTasksUser(tasks.filter( taskActual => taskActual._id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    const getTasks = async () => {
        try {
            const res = await getTasksRequest()
            setTasksUser(res.data)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    const updateTask = async (id, task) => {
        try {
            const res = await updateTaskRequest(id, task)
            getTasks()
            setTaskModal(false)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = handleSubmit((data) => {
        console.log(data)
        updateTask(task._id, data)
    })

    return(
        <div className="w-screen h-screen grid fixed top-0 left-0" onClick={() => setTaskModal([false, null])}>
            <form className='justify-self-center self-center w-[45%] h-[80%] bg-white shadow-2xl
             flex flex-col gap-2 dark:border rounded-md p-5' onClick={(e) => e.stopPropagation()} onSubmit={onSubmit}>
                <button className='self-end bg-gray-400 rounded-full w-8 h-8 flex justify-center items-center hover:bg-gray-300' onClick={() => setTaskModal([false, null])} >
                    <svg focusable="false" width="20" height="20" viewBox="0 0 24 24">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
                    </svg>
                </button>
                <input type="text" value={title} className='outline-none border-[gray] border rounded-md p-2' {...register('title')} onChange={(e) => setTitle(e.target.value)}/>
                <textarea name="description" id="description" value={description} className='outline-none border-[gray] border rounded-md p-2' {...register('description')} onChange={(e) => setDescription(e.target.value)}/>
                <input type="datetime-local" value={dateStart} className='outline-none border-[gray] border rounded-md p-2' {...register('dateStart')} onChange={(e) => setDateStart(e.target.value)}/>
                <input type="datetime-local" value={dateEnd} className='outline-none border-[gray] border rounded-md p-2'  {...register('dateEnd')} onChange={(e) => setDateEnd(e.target.value)}/>
                <button className='bg-red-600 p-2 rounded-md' onClick={() => {
                    setWindowQuestion(true)
                }} type='button'>Eliminar</button>
                
                <button className='bg-green-400 p-2 rounded-md' type='submit'>Guardar</button>
            </form>
            {windowQuestion && (<WindowQuestion deleteTask={deleteTask} setWindowQuestion={setWindowQuestion} id={task._id}/>)}
        </div>
    )
}

export default ModalTask

ModalTask.propTypes = {
    taskModal: PropTypes.array.isRequired,
    setTaskModal: PropTypes.func.isRequired,
    tasks: PropTypes.array.isRequired,
    setTasksUser: PropTypes.func.isRequired,
}

WindowQuestion.propTypes = {
    setWindowQuestion: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    id: PropTypes.any.isRequired,
}