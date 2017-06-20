/**
 * Created by Jakub on 11.6.2017.
 */
import {combineReducers} from 'redux-immutable'
import Immutable from 'immutable'

import * as Wages from './wages'
import * as salaryPeriods from './salaryPeriods'

import {NEW_SALARY_PERIOD} from 'constants.js'

export const defaultState = Immutable.fromJS({
  baseWages: 0,
  otWages: 0,
  selectedSalaryPeriod: NEW_SALARY_PERIOD,
  isEditingSalaryPeriod: false,
  salaryPeriods: Immutable.OrderedMap({
    [NEW_SALARY_PERIOD]: salaryPeriods.createNewSP()
  }),
})

export default combineReducers({
  baseWages: Wages.baseWages,
  otWages: Wages.otWages,
  selectedSalaryPeriod: salaryPeriods.selectedSalaryPeriod,
  isEditingSalaryPeriod: salaryPeriods.isEditing,
  salaryPeriods: salaryPeriods.salaryPeriods,
})