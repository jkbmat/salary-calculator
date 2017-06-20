/**
 * Created by Jakub on 12.6.2017.
 */
/* eslint-disable no-restricted-globals */

import React from 'react'
import {Modal, Glyphicon, Grid, Tabs, Tab, Button} from 'react-bootstrap'
import {connect} from 'react-redux'

import FormItem from 'components/FormItem'
import Input from 'components/Input'
import Day from 'components/Day'

import {
  setSalaryPeriodEditing,
  setSalaryPeriod,
  clearNewSalaryPeriod,
  createSalaryPeriod,
  selectSalaryPeriod,
  removeSalaryPeriod,
} from 'actions/salaryPeriod'

import {
  createDay
} from 'actions/day'

import {NEW_SALARY_PERIOD} from 'constants.js'

import './style.css'


class EditPeriodModal extends React.PureComponent {
  renderTab (sp) {
    const {setSalaryPeriod, createDayHandler} = this.props

    const isNew = sp.get('id') === NEW_SALARY_PERIOD
    const newIcon = (
      <Glyphicon glyph='plus' className='green' />
    )

    const changeFn = (field) => {
      return (value) => setSalaryPeriod(sp.set(field, value))
    }

    return (
      <Tab key={sp.get('id')} eventKey={sp.get('id')} title={isNew ? newIcon : sp.get('name')}>
        <Grid fluid={true} className='separator--bottom'>
          <FormItem label='Name: ' className='separator--bottom'>
            <Input statePath={['salaryPeriods', sp.get('id'), 'name']} onChange={changeFn('name')}/>
          </FormItem>
          <FormItem label='Seniority bonus: '>
            <Input statePath={['salaryPeriods', sp.get('id'), 'seniorityBonus']} onChange={changeFn('seniorityBonus')}/>
          </FormItem>
          <FormItem label='Personal bonus: '>
            <Input statePath={['salaryPeriods', sp.get('id'), 'personalBonus']} onChange={changeFn('personalBonus')}/>
          </FormItem>
          <FormItem label='Company bonus: '>
            <Input statePath={['salaryPeriods', sp.get('id'), 'companyBonus']} onChange={changeFn('companyBonus')}/>
          </FormItem>
          <FormItem label='Meal vouchers: '>
            <Input statePath={['salaryPeriods', sp.get('id'), 'mealVoucherBonus']} onChange={changeFn('mealVoucherBonus')}/>
          </FormItem>
        </Grid>

        <div className='days'>
          {sp.get('days').valueSeq().map((day, index) => (
            <Day key={index} index={index} salaryPeriodID={sp.get('id')}/>
          ))}

          <Button onClick={() => createDayHandler(sp.get('id'))}><Glyphicon className='green' glyph='plus'/>&nbsp;Add day</Button>
        </div>


      </Tab>
    )
  }

  render () {
    const {isEditing, closeModal, salaryPeriods, salaryPeriodID, createSP, selectSP, removeSP} = this.props

    return (
      <Modal show={isEditing} onHide={closeModal} dialogClassName='EditPeriod'>
        <Modal.Header className='flex-grow--first'>
          <Modal.Title>Salary Period Editor</Modal.Title>
          <Glyphicon glyph='remove' onClick={closeModal} className='link red' />
        </Modal.Header>
        <Modal.Body>
          <Tabs activeKey={salaryPeriodID} id='sp-selection-tabs' onSelect={(id) => selectSP(id)} animation={false}>
            {salaryPeriods.valueSeq().map((sp) => this.renderTab(sp))}
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
        {salaryPeriodID === NEW_SALARY_PERIOD
          ? (
            <Button onClick={createSP} bsStyle='success'>Create</Button>
          ) : (
            <Button onClick={() => confirm(`Are you sure you want to delete the selected salary period?`) && removeSP(salaryPeriodID)} bsStyle='danger'>Remove</Button>
          )
        }
        </Modal.Footer>
      </Modal>
    )
  }
}

export default connect(
  (state, ownProps) => ({
    salaryPeriodID: state.get('selectedSalaryPeriod'),
    isEditing: state.get('isEditingSalaryPeriod'),
    salaryPeriods: state.get('salaryPeriods'),
  }),
  (dispatch, ownProps) => ({
    setSalaryPeriod: (salaryPeriod) => dispatch(setSalaryPeriod(salaryPeriod)),
    createSP: () => dispatch(createSalaryPeriod()),
    closeModal: () => {
      dispatch(clearNewSalaryPeriod())
      dispatch(setSalaryPeriodEditing(false))
    },
    selectSP: (id) => dispatch(selectSalaryPeriod(id)),
    removeSP: (id) => dispatch(removeSalaryPeriod(id)),
    createDayHandler: (id) => dispatch(createDay(id))
  }),
)(EditPeriodModal)

/* eslint-enable no-restricted-globals */