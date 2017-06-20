/**
 * Created by Jakub on 11.6.2017.
 */
import Immutable from 'immutable'
import {
  SALARY_PERIOD_SELECT,
  SALARY_PERIOD_SET_EDITING,
  SALARY_PERIOD_SET,
  SALARY_PERIOD_CLEAR_NEW,
  SALARY_PERIOD_CREATE,
  SALARY_PERIOD_REMOVE
} from 'actions/salaryPeriod'

import {
  DAY_ADD,
  DAY_REMOVE,
  DAY_SET_WEEKEND,
  DAY_SET_MINUTES,
  DAY_SET_HOURS
} from 'actions/day'

import {setMinutes, setHours} from 'utils.js'

import {NEW_SALARY_PERIOD} from 'constants.js'



export const createNewSP = () => Immutable.fromJS({
  id: NEW_SALARY_PERIOD,
  name: '',
  seniorityBonus: 0,
  personalBonus: 0,
  companyBonus: 0,
  mealVoucherBonus: 0,
  days: []
})

export const createNewDay = () => Immutable.fromJS({
  time: 0,
  isWeekend: false,
})


export const salaryPeriods = (state = Immutable.List(), action) => {
  const {type, payload} = action

  switch (type) {
    case SALARY_PERIOD_SET: {
      return state.set(payload.sp.get('id'), payload.sp)
    }

    case SALARY_PERIOD_CLEAR_NEW: {
      return state.set(NEW_SALARY_PERIOD, Immutable.fromJS(createNewSP()))
    }

    case SALARY_PERIOD_CREATE: {
      const {id} = payload

      const newSP = state.get(NEW_SALARY_PERIOD).set('id', id)
      return state.set(id, newSP)
    }

    case SALARY_PERIOD_REMOVE: {
      return state.delete(payload.id)
    }


    case DAY_ADD: {
      return state.updateIn([payload.salaryPeriodID, 'days'], (days) => days.push(createNewDay()))
    }

    case DAY_SET_MINUTES: {
      return state.updateIn([payload.salaryPeriodID, 'days', payload.dayIndex], (day) => day.set('time', setMinutes(day.get('time'), payload.minutes)))
    }

    case DAY_SET_HOURS: {
      return state.updateIn([payload.salaryPeriodID, 'days', payload.dayIndex], (day) => day.set('time', setHours(day.get('time'), payload.hours)))
    }

    case DAY_SET_WEEKEND: {
      return state.updateIn([payload.salaryPeriodID, 'days', payload.dayIndex], (day) => day.set('isWeekend', payload.value))
    }

    case DAY_REMOVE: {
      return state.removeIn([payload.salaryPeriodID, 'days', payload.dayIndex])
    }

    default: {
      return state
    }
  }
}

export const selectedSalaryPeriod = (state = NEW_SALARY_PERIOD, action) => {
  const {type, payload} = action

  if (type === SALARY_PERIOD_SELECT) {
    return payload.id
  }

  return state
}

export const isEditing = (state = false, action) => {
  const {type, payload} = action

  if (type === SALARY_PERIOD_SET_EDITING) {
    return payload.value
  }

  return state
}