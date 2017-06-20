/**
 * Created by Jakub on 15.6.2017.
 */
export const DAY_ADD = 'Add day'
export const DAY_REMOVE = 'Remove day'
export const DAY_SET_HOURS = 'Set hours'
export const DAY_SET_MINUTES = 'Set minutes'
export const DAY_SET_WEEKEND = 'Set weekend'

export const createDay = (salaryPeriodID) => ({
  type: DAY_ADD,
  payload: {salaryPeriodID},
})

export const setHours = (salaryPeriodID, dayIndex, hours) => ({
  type: DAY_SET_HOURS,
  payload: {salaryPeriodID, dayIndex, hours: Number(hours)},
})

export const setMinutes = (salaryPeriodID, dayIndex, minutes) => ({
  type: DAY_SET_MINUTES,
  payload: {salaryPeriodID, dayIndex, minutes: Number(minutes)},
})

export const setWeekend = (salaryPeriodID, dayIndex, value) => ({
  type: DAY_SET_WEEKEND,
  payload: {salaryPeriodID, dayIndex, value: Boolean(value)},
})

export const removeDay = (salaryPeriodID, dayIndex) => ({
  type: DAY_REMOVE,
  payload: {salaryPeriodID, dayIndex}
})