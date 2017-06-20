/**
 * Created by Jakub on 11.6.2017.
 */
import {BASE_WAGES_SET, OT_WAGES_SET} from 'actions/wages'


export const baseWages = (state = 0, action) => {
  const {payload} = action

  if (action.type === BASE_WAGES_SET) {
    return Number(payload.value)
  }

  return state
}

export const otWages = (state = 0, action) => {
  const {payload} = action

  if (action.type === OT_WAGES_SET) {
    return Number(payload.value)
  }

  return state
}