import { useForm } from "react-hook-form"
import '../css/tasks.css'
import { useEffect, useState } from "react"
import Calendar from "../components/Calendar.jsx"
import { Link } from "react-router-dom"
import { useAuth } from "../context/useAuthContext.js"
import { useTask } from "../context/useTasksContext.js"

function TasksPage() {
  const { register, handleSubmit } = useForm()

  const {logOut, user} = useAuth()

  const {getTasks, createTask, tasks} = useTask()

  console.log(user)

  console.log("Renderizado page tasks")

  const onSubmit = handleSubmit((data) => {
    createTask(data)
  })

  useEffect(() => {
    getTasks()
  }, [])

  const convertDate = (date) => {
    const dateObject = new Date(date)
    const options = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true, // Usar formato de 12 horas
      timeZoneName: 'short' // Incluir el periodo AM/PM
    }

    const formatDate = dateObject.toLocaleString('es-ES', options)

    return formatDate

  }

  function getComponentsDate(date) {
    const monthRegex = /de (\w+) de/
    const monthMatch = date.match(monthRegex)
    const month = monthMatch ? monthMatch[1] : null

    const yearRegex = /de (\d{4}),/
    const yearMatch = date.match(yearRegex)
    const year = yearMatch ? yearMatch[1] : null

    const hourRegex = /(\d{2}:\d{2}:\d{2})/
    const hourMatch = date.match(hourRegex)
    const hour = hourMatch ? hourMatch[1] : null

    const amPmRegex = /([ap])\.?\s*m\./;
    const amPmMatch = date.match(amPmRegex);
    const amPm = amPmMatch ? (amPmMatch[1].toLowerCase() === 'p' ? 'PM' : 'AM') : null;

    const components = { month, year, hour, amPm, date }

    return components
  }

  return (
    <>
      <Calendar/>
      {tasks.map((task) => {

        return (
          <div key={task._id}>
            <h1>{task.title}</h1>
            <p>{task.description}</p>
            <p>{getComponentsDate(convertDate(task.dateStart)).date + getComponentsDate(convertDate(task.dateEnd)).date}</p>


          </div>
        )
      })}

      <form onSubmit={onSubmit} className="flex flex-col items-center w-[45%] border-blue-500 border-[1.5px] rounded-md">

        <fieldset className="w-full">
          <div className="flex justify-center items-center p-3 gap-3">
            <img src="/tarea.png" alt="" width="50px" height="50px" />
            <legend className="text-orange-500 font-extrabold text-2xl">Nueva Tarea</legend>
          </div>
        </fieldset>

        <fieldset className="flex flex-col items-center w-full gap-1">
          <label htmlFor="title" className="text-[darkblue] font-bold text-lg">Titulo:</label>
          <input type="text" name="title" id="title" className="outline-none border-gray-400 border-[1px] w-[90%] p-3 rounded-md" {...register('title')} required />

          <label htmlFor="description" className="text-[darkblue] font-bold text-lg">Descripción:</label>
          <textarea name="description" id="description" rows="3" className="outline-none border-gray-400 border-[1px] w-[90%] rounded-md" {...register('description')}></textarea>

          <label htmlFor="date" className="text-[darkblue] font-bold text-lg">Fecha Inicio:</label>
          <input type="datetime-local" name="date" id="date" className="outline-none border-gray-400 border-[1px] w-[90%] rounded-md p-3 text-center" {...register('dateStart')} required />

          <label htmlFor="date" className="text-[darkblue] font-bold text-lg">Fecha Fin:</label>
          <input type="datetime-local" name="date" id="date" className="outline-none border-gray-400 border-[1px] w-[90%] rounded-md p-3 text-center" {...register('dateEnd')} required />
        </fieldset>

        <button type="submit" className="magic-button">Agregar</button>

      </form>
      <Link to="/" onClick={() => {logOut()}}>Cerrar Sesión</Link>
    </>


  )
}

export default TasksPage