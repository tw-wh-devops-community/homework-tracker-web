import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { HomeworkShape } from '../../shared/shape'
import { fetchHomeworks } from '../actions'

export class Admin extends Component {
  componentWillMount() {
    this.props.fetchHomeworks()
  }

  render() {
    const { homeworks } = this.props
    return (
      <div className='homepage'>
        <div>HOMEWORK 管理平台</div>
        {homeworks.length}
      </div>
    )
  }
}

Admin.propTypes = {
  homeworks: PropTypes.arrayOf(HomeworkShape),
  fetchHomeworks: PropTypes.func.isRequired,
}

Admin.defaultProps = {
  homeworks: [],
}

const mapStateToProps = state => ({
  homeworks: state.homework.homeworks,
})

export default connect(mapStateToProps, { fetchHomeworks })(Admin)
