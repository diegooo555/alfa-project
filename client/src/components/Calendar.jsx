import ActualTime from "./calendar/ActualTime";
import HeaderWeek from "./calendar/HeaderWeek";
import IndicatorHour from './calendar/IndicatorHour';
import ModalTask from "./calendar/ModalTask";
import { useEffect, useRef, useState } from "react";
import { generateDaysWeek, getComponesFullDate} from "./calendar/logicCalendar";
import { useTask } from "../context/useTasksContext.js";
import PropTypes from 'prop-types';


const hoursDay = [
  [12, 'AM'], [1, 'AM'], [2, 'AM'], [3, 'AM'],
  [4, 'AM'], [5, 'AM'], [6, 'AM'], [7, 'AM'],
  [8, 'AM'], [9, 'AM'], [10, 'AM'], [11, 'AM'],
  [12, 'PM'], [1, 'PM'], [2, 'PM'], [3, 'PM'],
  [4, 'PM'], [5, 'PM'], [6, 'PM'], [7, 'PM'],
  [8, 'PM'], [9, 'PM'], [10, 'PM'], [11, 'PM'],
]

const ColumnHours = () => {

  return (
    <div className="flex flex-col">
      {hoursDay.map((hour, index) => (

        <span key={index} className="text-xs font-semibold text-gray-500 h-16 text-end pr-1">{`${hour[0]} ${hour[1]}`}</span>

      ))}
    </div>
  )
}

const RowHour = ({ hourStart, formatStart, hourEnd, formatEnd, day, month, year }) => {

  return (
    <div className="border-solid border-[1px] border-blue-300 hover:bg-blue-100"></div>
  )
}

const RowsHour = ({ day, month, year }) => {

  return (
    <div className="grid grid-rows-24">
      {hoursDay.map((hour, index) => {
        const hourEnd = hour[0] === 12 ? 1 : hour[0] + 1
        const formatEnd = hour[0] === 11 ? (hour[1] === 'AM' ? 'PM' : 'AM') : hour[1]
        return (
          <RowHour key={index} hourStart={hour[0]} formatStart={hour[1]} hourEnd={hourEnd}
          formatEnd={formatEnd} className="border-solid border-[1px] border-blue-300" 
          day={day} month={month} year={year}/>
        )
      })}
    </div>
  )
}

const ColumnDay = ({ day, month, year, state, tasks, setTaskModal}) => {
  //Function handleClick for create Task
  const styleComponent = state ? "grid grid-rows-24 bg-blue-200 relative" : "grid grid-rows-24 relative"
  const addZero = (time) => ( time < 10 ? `0${time}` : time)

  return (

    <div className={styleComponent}>
      <RowsHour day={day} month={month} year={year}/>
      {tasks.length > 0 && (tasks.map((task, index) => {
        const dateStart = getComponesFullDate(task.dateStart)
        const dateEnd = getComponesFullDate(task.dateEnd)
        const sameFinishDay = dateStart.day === dateEnd.day
        const sameRangeDays = (day > dateStart.day) && (day < dateEnd.day)
        const hourStProv = dateStart.hour + (dateStart.minutes / 60) 
        const hoursStart = sameFinishDay ? hourStProv : day > dateStart.day ? 0 : hourStProv
        const hourStartDefinitive = sameRangeDays ? 0 : hoursStart
        const hourEndProv = dateEnd.hour + (dateEnd.minutes / 60)
        const hoursEnd = sameFinishDay ? hourEndProv : day < dateEnd.day ? 24 : hourEndProv
        const hourEndDefinitive = sameRangeDays ? 24 : hoursEnd
        const positionPorcent = Number((hoursStart/24) * 100)
        const heightPorcent = ((hourEndDefinitive - hourStartDefinitive) / 24) * 100

        const formatHourStart = dateStart.hour > 12 ? dateStart.hour - 12 : dateStart.hour
        const formatHourEnd = dateEnd.hour > 12 ? dateEnd.hour - 12 : dateEnd.hour
        
        return(
          <button key={index} className="w-[98%] bg-green-400 absolute
           rounded-md flex flex-col items-center justify-center text-white" 
           style={{top: `${positionPorcent}%`, height: `${heightPorcent}%`}} onClick={() => setTaskModal([true, task])}>
            <span>{task.title}</span>
            <span>{`${formatHourStart}:${addZero(dateStart.minutes)+dateStart.amPm}-${formatHourEnd}:${addZero(dateEnd.minutes) + dateEnd.amPm}`}</span>
          </button>
        )
      }))}
      {state && (
        <IndicatorHour/>
      )}
    </div>

  )
}

const Calendar =  () =>  {
  const dateActual = new Date();
  const arrayDays = ["DO", "LU", "MA", "MI", "JU", "VI", "SA"]
  const dayActualNumber = dateActual.getDate()
  const dayActualString = arrayDays[dateActual.getDay()]
  const monthActual = dateActual.getMonth() + 1
  const actualYear = dateActual.getFullYear()

  const daysWeek = generateDaysWeek(dayActualString, dayActualNumber, actualYear, monthActual, arrayDays)
  const scrollableContainerRef = useRef(null)
  const [taskModal, setTaskModal] = useState([false, null])

  const {tasks, updateTask, deleteTask} = useTask()

  useEffect(() => {
    const scrollCurrentTime = () => {
      const timeNow = new Date()
      const hours = timeNow.getHours() 
      const minutes = timeNow.getMinutes()
      const minutesPorcent = (minutes / 60)
      const hoursPorcent = ((hours + minutesPorcent) / 24 )
      const positionScroll = Number(hoursPorcent.toFixed(4))
     
      scrollableContainerRef.current.scrollTop = (scrollableContainerRef.current.scrollHeight * (positionScroll)) - 30
    }
    scrollCurrentTime()
  },[])
  return (
    <div className="h-screen overflow-hidden">
      <ActualTime/>
      <HeaderWeek dateActual={dateActual} dayActualNumber={dayActualNumber} dayActualString={dayActualString} monthActual={monthActual} actualYear={actualYear} days={arrayDays} />
      <div className="h-[69%]">
        <div className="overflow-y-scroll h-full w-full grid grid-cols-7" style={{ gridTemplateColumns: '6% 13.42857% 13.42857% 13.42857% 13.42857% 13.42857% 13.42857% 13.42857%' }} ref={scrollableContainerRef}>
          <ColumnHours/>
          <>
            {daysWeek.map((dayObject, index) =>{

              const taskFilter = tasks.filter( task => {
                const dateStart = getComponesFullDate(task.dateStart)
                const dateEnd = getComponesFullDate(task.dateEnd)
                const conditionMonth = dateStart.month === dayObject.month
                const conditionYear = dateStart.year === dayObject.year
                const conditionDay = (dateStart.day === dayObject.day) || (dateEnd.day === dayObject.day)  || (dayObject.day > dateStart.day  && dayObject.day < dateEnd.day)
                return conditionDay && conditionMonth && conditionYear
              })
              return(
                <ColumnDay key={index} day={dayObject.day} month={dayObject.month} 
                year={dayObject.year} state={dayObject.state} tasks={taskFilter} taskModal={taskModal} setTaskModal={setTaskModal}/>
              )
            })}
          </>
        </div>
      </div>

      {taskModal[0] && (<ModalTask taskModal={taskModal} setTaskModal={setTaskModal} updateTask={updateTask} deleteTask={deleteTask}/>)}
    </div>
  )
}

export default Calendar

ColumnDay.propTypes = {
  day: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  state: PropTypes.bool.isRequired,
  tasks: PropTypes.array,
  setTaskModal: PropTypes.func.isRequired,
}

RowsHour.propTypes = {
  day: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
}

RowHour.propTypes = {
  hourStart: PropTypes.number.isRequired,
  formatStart: PropTypes.string.isRequired,
  hourEnd: PropTypes.number.isRequired,
  formatEnd: PropTypes.string.isRequired,
  day: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
}