import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import './HonorRolls.css'
import { HonorRollShape } from '../shared/shape'
import { fetchHonorRollsSortBySpeed, fetchHonorRollsSortByQuantity } from './actions'

const imageAPI = 'http://54.223.64.0:5678/'

export class HonorRolls extends Component {
  componentWillMount() {
    this.props.fetchHonorRollsSortByQuantity()
    this.props.fetchHonorRollsSortBySpeed()
  }

  buildCard = (item, type) => {
    const interviewerProfileUrl = item.interviewer_profile ?
      `${imageAPI}${item.interviewer_profile}` : `${imageAPI}image/default`

    const displayValye = type === 'speed' ? item.avg_duration : item.count
    const displayPre = type === 'speed' ? '平均1份作业' : '本月共看了'
    const displaySuffix = type === 'speed' ? '小时' : '份'
    return (
      <div className="card" key={item.interviewer_employee_id}>
        <div className="intraday-interviewer-name">{item.interviewer_name}</div>
        <div className="interviewer-profile">
          <img src={interviewerProfileUrl} alt="" />
        </div>
        <div className="time-records">
          <span>{displayPre}</span>
          <span className="time-highlight">{displayValye}</span>
          <span>{displaySuffix}</span>
        </div>
      </div>
    )
  }

  render() {
    const { honorRollsSortBySpeed, honorRollsSortByQuantity } = this.props
    return (
      <div className="content" >
        <div className="honor-rolls-container">
          <div className="honor-rolls-title">
            <div className="honor-rolls-title-text">光荣榜</div>
          </div>
          <div className="honor-rolls-content-wrapper">
            <div className="honor-rolls-content">
              {honorRollsSortBySpeed.map(item => this.buildCard(item, 'speed'))}
            </div>
            <div className="honor-rolls-content">
              {honorRollsSortByQuantity.map(item => this.buildCard(item, 'quantity'))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

HonorRolls.propTypes = {
  honorRollsSortBySpeed: PropTypes.arrayOf(HonorRollShape),
  honorRollsSortByQuantity: PropTypes.arrayOf(HonorRollShape),
  fetchHonorRollsSortByQuantity: PropTypes.func.isRequired,
  fetchHonorRollsSortBySpeed: PropTypes.func.isRequired,
}

HonorRolls.defaultProps = {
  honorRollsSortBySpeed: [],
  honorRollsSortByQuantity: [],
}

const mapStateToProps = state => ({
  honorRollsSortBySpeed: state.assignmentPage.honorRollsSortBySpeed,
  honorRollsSortByQuantity: state.assignmentPage.honorRollsSortByQuantity,
})

export default connect(mapStateToProps,
  { fetchHonorRollsSortBySpeed, fetchHonorRollsSortByQuantity })(HonorRolls)
