/**
 * Created by Jakub on 11.6.2017.
 */
import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import './style.css'

class Input extends React.PureComponent {
  static propTypes = {
    type: PropTypes.string,
    statePath: PropTypes.array,
    value: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired,
    ]),
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    type: 'text'
  }

  render () {
    const {type, value, changeHandler, id} = this.props

    return (
      <input className='Input' type={type} value={value} onChange={changeHandler} id={id} />
    )
  }
}

export default connect(
  (state, ownProps) => {
    if (ownProps.value == null) {
      return {
        value: state.getIn(ownProps.statePath),
      }
    }

    return {}
  },
  (dispatch, ownProps) => ({
    changeHandler: (e) => dispatch(ownProps.onChange(e.target.value)),
  })
)(Input)