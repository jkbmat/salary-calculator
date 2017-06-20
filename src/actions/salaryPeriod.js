/**
 * Created by Jakub on 11.6.2017.
 */
import uuid from 'uuid/v4'

import {NEW_SALARY_PERIOD} from 'constants.js'

export const SALARY_PERIOD_SELECT = 'Select salary period'
export const SALARY_PERIOD_SET_EDITING = 'Set salary period editing'
export const SALARY_PERIOD_SET = 'Set salary period'
export const SALARY_PERIOD_CLEAR_NEW = 'Clear new salary period'
export const SALARY_PERIOD_CREATE = 'Create new salary period'
export const SALARY_PERIOD_REMOVE = 'Remove salary period'


export const selectSalaryPeriod = (id) => ({
  type: SALARY_PERIOD_SELECT,
  payload: {id},
})

export const setSalaryPeriodEditing = (value) => ({
  type: SALARY_PERIOD_SET_EDITING,
  payload: {value: Boolean(value)},
})

export const setSalaryPeriod = (sp) => ({
  type: SALARY_PERIOD_SET,
  payload: {sp},
})

export const clearNewSalaryPeriod = () => ({
  type: SALARY_PERIOD_CLEAR_NEW,
})

export const createSalaryPeriod = () => (dispatch) => {
  const id = uuid()

  dispatch({
    type: SALARY_PERIOD_CREATE,
    payload: {id}
  })

  dispatch(selectSalaryPeriod(id))

  dispatch(clearNewSalaryPeriod())
}

export const removeSalaryPeriod = (id) => (dispatch, getState) => {
  dispatch({
    type: SALARY_PERIOD_REMOVE,
    payload: {id},
  })

  if (getState().get('selectedSalaryPeriod') === id) {
    dispatch(selectSalaryPeriod(NEW_SALARY_PERIOD))
  }

}