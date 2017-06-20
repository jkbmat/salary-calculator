import React, {Component} from 'react'

import {Grid} from 'react-bootstrap'
import Input from 'components/Input'
import PeriodSelector from 'components/PeriodSelector'
import FormItem from 'components/FormItem'
import Summary from 'components/Summary'
import EditPeriodModal from 'components/EditPeriodModal'

import './style.css'
import logo from './logo.png'

import * as WageAction from 'actions/wages'
import * as SalaryPeriodAction from 'actions/salaryPeriod'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <EditPeriodModal />
        <div className='App__header separator--bottom'>
          <img src={logo} alt='logo' className='header__logo'/>
          <strong>ROIHunter</strong>&nbsp;salary calculator
        </div>
        <div className='App__body'>
          <Grid fluid={true} className='App__wages'>
            <FormItem label='Base wages: '>
              <Input type='number' onChange={WageAction.setBaseWages} statePath={['baseWages']}/>
            </FormItem>
            <FormItem label='Overtime wages: '>
              <Input type='number' onChange={WageAction.setOtWages} statePath={['otWages']}/>
            </FormItem>
            <FormItem label='Salary period: '>
              <PeriodSelector onChange={SalaryPeriodAction.selectSalaryPeriod} statePath={['selectedSalaryPeriod']} />
            </FormItem>
          </Grid>
          <Summary className='App__summary separator--top' />
        </div>
      </div>
    )
  }
}

export default App
