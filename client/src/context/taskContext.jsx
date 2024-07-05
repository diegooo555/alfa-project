import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { createTaskRequest, getTasksRequest, deleteTaskRequest } from "../api/tasks";

export const TaskContext = createContext();

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
        const res = await createTaskRequest(task)
        console.log(res)
    }

    const deleteTask = async (id) => {
        const res = await deleteTaskRequest(id)
        console.log(res)
    }

    return(
        <TaskContext.Provider value={{tasks, createTask, getTasks, deleteTask}}>
            {children}
        </TaskContext.Provider>
    )
}

TaskProvider.propTypes = {
    children: PropTypes.node.isRequired, // Valida que children sea un nodo React y que es obligatorio
};