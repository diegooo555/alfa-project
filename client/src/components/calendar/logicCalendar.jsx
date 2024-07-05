
const generateDaysMonths = (actualYear) => {
    let daysMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    if (actualYear % 4 === 0 || actualYear % 400 === 0) {
        daysMonths[1] = 29
    }

    return daysMonths
}

export const generateDaysWeek = (dayActualString, dayActualNumber, actualYear, monthActual) => {
    const days = ["DO", "LU", "MA", "MI", "JU", "VI", "SA"]
    const daysWeek = Array(7)
    const indexWeekDay = days.indexOf(dayActualString)
    const daysMonthActual = generateDaysMonths(actualYear)[monthActual - 1]

    const daysPrevMonth = generateDaysMonths(actualYear)[monthActual - 2]

    for (let index = 0; index < daysWeek.length; index++) {
        let monthActualDay = monthActual
        let yearActualDay = actualYear

        if (index > indexWeekDay) {
            let nextNumDay = dayActualNumber + (index - (indexWeekDay))
            if (nextNumDay > daysMonthActual) {
                nextNumDay = nextNumDay - daysMonthActual
                monthActualDay++
                if (monthActualDay > 12) {
                    monthActualDay = 1
                    yearActualDay++
                }
            }
            daysWeek[index] = {
                day: nextNumDay,
                state: false,
                month: monthActualDay,
                year: yearActualDay
            }
        } else {
            let prevNumDay = dayActualNumber - (indexWeekDay - index)
            if (prevNumDay <= 0) {
                prevNumDay = daysPrevMonth + prevNumDay
                monthActualDay--
                if(monthActualDay === 0){
                    monthActualDay = 12
                    yearActualDay--
                }
            }
            daysWeek[index] = {
                day: prevNumDay,
                state: false,
                month: monthActualDay,
                year: yearActualDay,
            }
        }
    }

    daysWeek[indexWeekDay] = {
        day: dayActualNumber,
        state: true,
        month: monthActual,
        year: actualYear
    }

    return daysWeek
}

export function getComponentsDate(date) {
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

export function getComponesFullDate(date){
    const year = Number(date.substring(0,4))
    const month = Number(date.substring(5,7))
    const day = Number(date.substring(8,10))
    const hour = Number(date.substring(11,13))
    const minutes = Number(date.substring(14,17))
    const amPm = hour > 12 ? 'pm' : 'am'
    const components = {year, month, day, hour, minutes, amPm}

    return components
}