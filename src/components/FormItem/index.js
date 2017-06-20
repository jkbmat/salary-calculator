/**
 * Created by Jakub on 11.6.2017.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Col, Row} from 'react-bootstrap'
import uuid from 'uuid/v4'

import './style.css'

export const FormInput = ({children, id}) => (
  <Col className='FormInput' xs={12} md={8}>
    {React.cloneElement(children, {id})}
  </Col>
)

export const FormLabel = ({children, id}) => (
  <Col className='FormLabel' xs={12} md={4}>
    <label className='FormLabel__label' htmlFor={id || ''}>
      {children}
    </label>
  </Col>
)

export default class extends React.PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    className: PropTypes.string,
  }

  id = `form-element-${uuid()}`

  render () {
    const {label, children, className} = this.props

    return (
      <Row className={`FormItem ${className || ''}`}>
        <FormLabel id={this.id}>{label}</FormLabel>
        <FormInput id={this.id}>{children}</FormInput>
      </Row>
    )
  }
}

