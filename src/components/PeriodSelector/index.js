/**
 * Created by Jakub on 11.6.2017.
 */
import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Button} from 'react-bootstrap'

import {setSalaryPeriodEditing} from 'actions/salaryPeriod'

import {NEW_SALARY_PERIOD} from 'constants.js'

import './style.css'



class PeriodSelector extends React.PureComponent {
  static propTypes = {
    statePath: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  render () {
    const {value, changeHandler, id, salaryPeriods, onEditClick} = this.props


    return (
      <div className='PeriodSelector flex-grow--first'>
        <select className='Input PeriodSelector__select' value={value} onChange={changeHandler} id={id}>
          {salaryPeriods.valueSeq().map((sp) => (
            <option key={sp.get('id')} value={sp.get('id')}>{sp.get('id') === NEW_SALARY_PERIOD ? '< New salary period >' : sp.get('name')}</option>
          ))}
        </select>
        <Button className='PeriodSelector__edit-button' onClick={onEditClick}>
          {value === NEW_SALARY_PERIOD ? 'Create' : 'Edit'}
        </Button>
      </div>
    )
  }
}

export default connect(
  (state, ownProps) => ({
    value: state.getIn(ownProps.statePath),
    salaryPeriods: state.getIn(['salaryPeriods']),
  }),
  (dispatch, ownProps) => ({
    changeHandler: (e) => dispatch(ownProps.onChange(e.target.value)),
    onEditClick: () => dispatch(setSalaryPeriodEditing(true))
  })
)(PeriodSelector)