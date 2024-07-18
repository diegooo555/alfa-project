import {useEffect, useState } from "react";
import PropTypes from "prop-types";
import { createTaskRequest, getTasksRequest, deleteTaskRequest, updateTaskRequest } from "../api/tasks";
import { TaskContext } from "./useTasksContext";


export const TaskProvider = ({children}) => {

    const [tasks, setTasks] = useState([]);


    const getTasks = async () => {
        const res = await getTasksRequest()
        console.log(res)
        try {
            setTasks(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const createTask = async (task) => {
        try {
            const res = await createTaskRequest(task)
            console.log(res)
            getTasks()
        } catch (error) {
            console.log(error)
        }
    }


    const updateTask = async (id, task) => {
        try {
            const res = await updateTaskRequest(id, task)
            getTasks()
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteTask = async (id) => {
        try {
            const res = await deleteTaskRequest(id) 
            if(res.status === 204 ) setTasks(tasks.filter( taskActual => taskActual._id !== id))
        } catch (error) {
            console.log(error)
        }
    }


    return(
        <TaskContext.Provider value={{tasks, setTasks,createTask, getTasks, deleteTask, updateTask}}>
            {children}
        </TaskContext.Provider>
    )
}

TaskProvider.propTypes = {
    children: PropTypes.node.isRequired, // Valida que children sea un nodo React y que es obligatorio
};