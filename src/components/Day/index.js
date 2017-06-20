/**
 * Created by Jakub on 15.6.2017.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {Checkbox, Glyphicon} from 'react-bootstrap'
import Input from 'components/Input'

import {setHours, setMinutes, setWeekend, removeDay} from 'actions/day'

import {getHours, getMinutes} from 'utils.js'

import './style.css'


class Day extends React.PureComponent {
  static propTypes = {
    salaryPeriodID: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    hours: PropTypes.number,
    minutes: PropTypes.number,
    isWeekend: PropTypes.bool,
  }

  render () {
    const {hours, minutes, isWeekend, onHoursChange, onMinutesChange, onWeekendChange} = this.props

    return (
      <div className={`day ${isWeekend ? 'day--weekend' : ''}`}>
        <div className='day__header flex-grow--first'>
          <strong>Day #{this.props.index + 1}</strong>
          <Glyphicon className='red link' glyph='remove' onClick={this.props.onRemove} />
        </div>

        <div className='day__contents'>
          <div className='day__time'>
            <Input value={hours} type='number' pattern='[0-9]*' onChange={onHoursChange} />
            <span className='time__separator'> : </span>
            <Input value={minutes} type='number' pattern='[0-9]*' onChange={onMinutesChange} />
          </div>
          <label className='day__isWeekend'>
            <span>Weekend: </span>
            <Checkbox checked={isWeekend} inline={true} className='isWeekend__checkbox' onChange={(e) => onWeekendChange(e.target.checked)} />
          </label>
        </div>
      </div>
    )
  }
}

export default connect(
  (state, ownProps) => {
    const day = state.getIn(['salaryPeriods', ownProps.salaryPeriodID, 'days', ownProps.index])

    return {
      hours: getHours(day.get('time')),
      minutes: getMinutes(day.get('time')),
      isWeekend: day.get('isWeekend'),
    }
  },

  (dispatch, ownProps) => ({
    onHoursChange: (e) => dispatch(setHours(ownProps.salaryPeriodID, ownProps.index, e)),
    onMinutesChange: (e) => dispatch(setMinutes(ownProps.salaryPeriodID, ownProps.index, e)),
    onWeekendChange: (e) => dispatch(setWeekend(ownProps.salaryPeriodID, ownProps.index, e)),
    onRemove: () => dispatch(removeDay(ownProps.salaryPeriodID, ownProps.index))
  })
)(Day)