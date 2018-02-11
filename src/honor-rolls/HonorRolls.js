import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import './HonorRolls.css'
import { HonorRollShape } from '../shared/shape'
import { fetchHonorRollsSortBySpeed, fetchHonorRollsSortByQuantity } from './actions'

const imageAPI = 'http://127.0.0.1:5678/'

export class HonorRolls extends Component {
  componentWillMount() {
    this.props.fetchHonorRollsSortByQuantity()
    this.props.fetchHonorRollsSortBySpeed()
  }

  buildCard = (item, type) => {
    const interviewerProfileUrl = item.interviewer_profile ?
      `${imageAPI}${item.interviewer_profile}` : `${imageAPI}image/default`

    const displayValye = type === 'speed' ? item.avg_duration : item.count
    return (
      <div className="card" key={item.interviewer_employee_id}>
        <div className="interviewer-name">{item.interviewer_name}</div>
        <div className="interviewer_profile">
          <img src={interviewerProfileUrl} alt="" />
        </div>
        <div className="time-records">{displayValye}</div>
      </div>
    )
  }

  render() {
    const { honorRollsSortBySpeed, honorRollsSortByQuantity } = this.props
    return (
      <div className="content" >
        <div>
          <div>
            <div className="">光荣榜</div>
          </div>
          <div>
            {honorRollsSortBySpeed.map(item => this.buildCard(item, 'speed'))}
          </div>
          <div>
            {honorRollsSortByQuantity.map(item => this.buildCard(item, 'quantity'))}
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
  honorRollsSortBySpeed: state.honorRollsPage.honorRollsSortBySpeed,
  honorRollsSortByQuantity: state.honorRollsPage.honorRollsSortByQuantity,
})

export default connect(mapStateToProps,
  { fetchHonorRollsSortBySpeed, fetchHonorRollsSortByQuantity })(HonorRolls)
