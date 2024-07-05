import { useState, useEffect } from 'react'
function ActualTime() {
  const [currentTime, setCurrentTime] = useState('')
  useEffect(() => {
    const updateTime = () => {
        const timeNow = new Date()
        const hours = timeNow.getHours() 
        const hoursFormat = hours > 12 ? hours - 12 : hours
        const amPm = hours > 12 ? 'PM' : 'AM'
        const minutes = timeNow.getMinutes()
        const seconds = timeNow.getSeconds()
        const addZero = (time) => ( time < 10 ? `0${time}` : time)
        setCurrentTime(`${addZero(hoursFormat)}:${addZero(minutes)}:${addZero(seconds)} ${amPm}`)
    }
    updateTime(

    )
  
    const intervalTimer = setInterval(updateTime, 1000)
    
    return () => clearInterval(intervalTimer)
  },[])

    return (
      <div className="flex gap-2 w-full justify-center pt-3 h-[15%]">
        <div className="flex items-center justify-center p-3 bg-blue-500 w-14 h-14 rounded-md text-white font-bold text-2xl hover:scale-90 hover:bg-blue-400 cursor-pointer">
          {currentTime.substring(0, 2)}
        </div>
        <div className="flex items-center justify-center p-3 bg-blue-500 w-14 h-14 rounded-md text-white font-bold text-2xl hover:scale-90 hover:bg-blue-400 cursor-pointer">
          {currentTime.substring(3,5)}
        </div>
        <div className="flex items-center justify-center p-3 bg-blue-500 w-14 h-14 rounded-md text-white font-bold text-2xl hover:scale-90 hover:bg-blue-400 cursor-pointer">
          {currentTime.substring(6,8)}
        </div>

        <div className="flex items-center justify-center p-3 bg-blue-500 w-14 h-14 rounded-md text-white font-bold text-2xl hover:scale-90 hover:bg-blue-400 cursor-pointer">
          {currentTime.substring(9,11)}
        </div>
      </div>
    )
}

export default ActualTime
