/**
 * Created by Jakub on 11.6.2017.
 */
import React from 'react'
import {connect} from 'react-redux'
import {Grid, Row, Col} from 'react-bootstrap'

import PropTypes from 'prop-types'

import {formatMoney, formatTime, sum} from 'utils'

import './style.css'

import {NEW_SALARY_PERIOD} from 'constants.js'


class Summary extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    salaryPeriodID: PropTypes.string,
  }

  renderRow = (label, data) => (
    <Row>
      <Col xs={8}><label>{label}</label></Col>
      <Col xs={4}>{data}</Col>
    </Row>
  )

  render () {
    const {className, baseWages, otWages, weekdays, weekends, bonus} = this.props

    if (this.props.salaryPeriodID === NEW_SALARY_PERIOD) {
      return null
    }
console.log(weekdays, weekends)
    const weekdayHours = sum(weekdays)
    const weekendHours = sum(weekends)

    const otHours = Math.max(0, weekdays.reduce((acc, val) => acc + val, -(weekdays.size * 8 - weekendHours))) + weekendHours
    const simpleOt = weekdayHours + weekendHours - weekdays.size * 8

    const normalPay = Math.max(0, Math.round((weekdayHours + weekendHours - otHours) * baseWages))
    const otPay = Math.round(otHours * otWages)

    return (
      <Grid fluid={true} className={`Summary ${className}`}>
        <Row>
          <Col xs={12} md={6}>
            <Row>
              {this.renderRow('Weekdays time: ', formatTime(weekdayHours))}
              {this.renderRow('Weekends time: ', formatTime(weekendHours))}
              {this.renderRow('Total time: ', formatTime(weekdayHours + weekendHours))}
              {this.renderRow('Overtime: ', formatTime(otHours))}
            </Row>
          </Col>
          <Col xs={12} md={6}>
            <Row>
              {this.renderRow('Normal salary: ', formatMoney(normalPay))}
              {this.renderRow('Overtime salary: ', formatMoney(otPay))}
              {this.renderRow('Total bonus: ', formatMoney(bonus))}
              {this.renderRow('Total salary: ', formatMoney(normalPay + otPay + bonus))}
            </Row>
          </Col>
        </Row>
        {simpleOt !== 0 && (
          <Row className='Summary__final'>
            <Col xs={12} md={8}>
            {simpleOt > 0 && this.renderRow('Time to spare: ', formatTime(simpleOt))}
            {simpleOt < 0 && this.renderRow('You still need to work for: ', formatTime(-simpleOt))}
            </Col>
          </Row>
        )}
      </Grid>
    )
  }
}

export default connect(
  (state, ownProps) => {
    const id = ownProps.salaryPeriodID || state.get('selectedSalaryPeriod')
    const days = state.getIn(['salaryPeriods', id, 'days'])
    const bonusFields = ['seniorityBonus', 'personalBonus', 'companyBonus', 'mealVoucherBonus']

    return {
      salaryPeriodID: id,
      baseWages: state.get('baseWages'),
      otWages: state.get('otWages'),
      weekdays: days.filter((day) => !day.get('isWeekend')).map((day) => day.get('time')),
      weekends: days.filter((day) => day.get('isWeekend')).map((day) => day.get('time')),
      bonus: state.getIn(['salaryPeriods', id]).reduce((bonus, val, key) => {
        if (bonusFields.includes(key)) {
          return bonus + Number(val)
        }

        return bonus
      }, 0)
    }
  },
)(Summary)


/*console.log(`
        Weekdays: ${formatTime(weekdayHours)}
        Weekends: ${formatTime(weekendHours)}
        Total: ${formatTime(weekendHours + weekdayHours)}
        ${simpleOt < 0 ?
    `You still need to work for ${formatTime(needToWork)}!`.red
  : simpleOt > 0 ?
    'Simple overtime: ' + `${formatTime(-needToWork)}`.green
  : ''
  }
        
        Overtime: ${formatTime(otHours)}
        Normal salary: ${formatMoney(normalPay)}
        Overtime salary: ${formatMoney(otPay)}
        Bonus: ${formatMoney(bonus)}
        Total salary: ${`${formatMoney(normalPay + otPay + bonus)}`.green}!!`)

*/