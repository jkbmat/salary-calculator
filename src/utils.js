/**
 * Created by Jakub on 13.6.2017.
 */
export const formatTime = (time) => {
  time = Number(time) || 0

  const hrs = Math.floor(time)
  const mins = Math.round((time % 1) * 60)

  return `${leftPadZero(hrs, 2)}:${leftPadZero(mins, 2)}`
}

export const formatMoney = (amount) => {
  amount = Number(amount) || 0

  const str = String(amount)
  let ret = ''

  for (let i = 0; i < str.length; i++) {
    if (i % 3 === 0 && i !== 0)
      ret = '.' + ret
    ret = str[str.length - i - 1] + ret
  }

  return ret
}

export const parseTime = (line) => {
  const results = line.match(/^([0-9]{1,2}[.]?[0-9]*)([*]?)$/)

  if (!results) {
    throw new Error(`ERROR: Malformed line \`${line}\``)
  }

  const time = Number(results[1])

  const hours = Math.floor(time)
  const minutes = (time % 1) * 100
  const hoursFull = hours + minutes / 60

  return {
    hours,
    minutes,
    hoursFull,
    isWeekend: Boolean(results[2])
  }
}

export const sum = (array) => array.reduce((acc, val) => acc + val, 0)

export const leftPadZero = (input, length) => {
  let ret = String(input)
  while (ret.length <  length) ret = '0' + ret

  return ret
}

export const getHours = (time) => Math.floor(time)
export const getMinutes = (time) => Math.round((time % 1) * 60)

export const setHours = (time, newHours) => Number(newHours) + getMinutes(time) / 60
export const setMinutes = (time, newMinutes) => {
  if (newMinutes >= 60) {
    return time
  }

  return getHours(time) + newMinutes / 60
}

