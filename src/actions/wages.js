/**
 * Created by Jakub on 11.6.2017.
 */
export const BASE_WAGES_SET = 'Set base wages'
export const OT_WAGES_SET = 'Set overtime wages'


export const setBaseWages = (value) => {
  return {
    type: BASE_WAGES_SET,
    payload: {value: Number(value)}
  }
}

export const setOtWages = (value) => {
  return {
    type: OT_WAGES_SET,
    payload: {value: Number(value)}
  }
}