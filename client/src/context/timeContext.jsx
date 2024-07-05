import { createContext, useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';

export const TimeContext = createContext()

export const TimeProvider = ({children}) => {
    const [currentTime, setCurrentTime] = useState('')

    const [currentPosition, setCurrentPosition] = useState(0)

    const scrollableContainerRef = useRef(null)

    useEffect(() => {
        const updateTime = () => {
            const timeNow = new Date()
            const hours = timeNow.getHours() 
            const hoursFormat = hours > 12 ? hours - 12 : hours
            const amPm = hours > 12 ? 'PM' : 'AM'
            const minutes = timeNow.getMinutes()
            const seconds = timeNow.getSeconds()
            const minutesPorcent = (minutes / 60)
            const hoursPorcent = ((hours + minutesPorcent) / 24 ) * 100
            setCurrentPosition(Number(hoursPorcent.toFixed(4)))
            const addZero = (time) => ( time < 10 ? `0${time}` : time)
            setCurrentTime(`${addZero(hoursFormat)}:${addZero(minutes)}:${addZero(seconds)} ${amPm}`)
        }
        updateTime()
          
        scrollableContainerRef.current.scrollTop = (scrollableContainerRef.current.scrollHeight * (currentPosition/100)) - 15
  
        const intervalTimer = setInterval(updateTime, 1000)
        
        return () => clearInterval(intervalTimer)
    },[currentPosition])

    return(
        <TimeContext.Provider value={{currentTime, setCurrentTime, currentPosition, setCurrentPosition, scrollableContainerRef}}>
            {children}
        </TimeContext.Provider>
    )
}

TimeProvider.propTypes = {
    children: PropTypes.node.isRequired,
}