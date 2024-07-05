import PropTypes from 'prop-types'
import { generateDaysWeek } from './logicCalendar'

const DayButton = ({ day, state, numDay }) => {


    return (
        <div className="w-[13.42857%] flex flex-col items-center justify-center">
                <p className={`${state ? 'text-blue-500 font-bold' : 'text-gray-500 font-bold'}`}>{day}</p>
                <div className={`${state ? 'bg-blue-500 text-white hover:bg-blue-700' 
            : 'text-gray-500 hover:bg-gray-300'} rounded-full font-bold text-xl 
             flex items-center justify-center cursor-pointer w-10 h-10`}>{numDay}</div>
        </div>
    )
}


function HeaderWeek({dateActual, days, dayActualNumber, dayActualString, monthActual, actualYear}) {


    const offsetInMinutes = dateActual.getTimezoneOffset();

    const offsetInHours = -(offsetInMinutes / 60);


    const sign = offsetInHours >= 0 ? "+" : "-";
    const absOffsetHours = Math.abs(Math.floor(offsetInHours));

    // Formatear la diferencia horaria
    const formattedOffset = `GMT${sign}${absOffsetHours.toString().padStart(2, '0')}`;




    return (
        <>
            <div className="w-full pt-1 h-[16%]">
                <div className="flex items-center">
                    <div className="w-[6%] self-stretch justify-self-stretch flex items-center">
                        <span className=" text-xs text-gray-500 font-semibold w-full text-end">{formattedOffset}</span>
                    </div>
                    {generateDaysWeek(dayActualString, dayActualNumber, actualYear, monthActual).map((objDay, index) => (        
                            <DayButton day={days[index]} state={objDay.state} numDay={objDay.day} key={index}/>
                    ))}
                </div>   
            </div>
        </>
    )
}

export default HeaderWeek

DayButton.propTypes = {
    day: PropTypes.string.isRequired,
    state: PropTypes.bool.isRequired,
    numDay: PropTypes.number.isRequired,
}

HeaderWeek.propTypes = {
    dateActual: PropTypes.object.isRequired,
    days: PropTypes.array.isRequired,
    dayActualNumber: PropTypes.number.isRequired,
    dayActualString: PropTypes.string.isRequired,
    monthActual: PropTypes.number.isRequired,
    actualYear: PropTypes.number.isRequired,
}