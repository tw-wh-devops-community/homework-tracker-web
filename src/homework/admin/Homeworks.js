import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { HomeworkShape } from '../../shared/shape'
import { fetchHomeworks } from '../actions'
import './homeworks.css'

const deleteIcon = require('../images/delete.png')
const editIcon = require('../images/edit.png')
const finishIcon = require('../images/finish.png')

const tableHeader = ['面试官', '候选人', 'Role', '分配日期', '截止日期', '完成时间', '当前状态']
const homeworkStatus = { 已完成: 'finish', 进行中: 'inProcess', 已超期: 'timeout' }

export class Homeworks extends Component {
  componentWillMount() {
    this.props.fetchHomeworks()
  }

  render() {
    const homeworkList = []
    const homeworks = this.props.homeworks

    homeworks.forEach((homework, index) => {
      const listBackgroundColor = index % 2 === 0 ? '#ffffff' : '#dedada'
      const tableRowClassName = `tableRow ${homeworkStatus[homework.status]}`

      homeworkList.push(
        <div
          key={homework.homework_id}
          className={tableRowClassName}
          style={{ backgroundColor: listBackgroundColor }}
        >
          <div className='tableColumn'>{homework.interviewer}</div>
          <div className='tableColumn'>{homework.candidate}</div>
          <div className='tableColumn'>{homework.job_role}</div>
          <div className='tableColumn'>{homework.assigned_date}</div>
          <div className='tableColumn'>{homework.deadline_date}</div>
          <div className='tableColumn'>{homework.finished_date}</div>
          <div className='tableColumn'>{homework.status}</div>
          <div className='tableColumn'>
            <img className='tableEditIcon' src={finishIcon} alt='finishIcon' />
            <img className='tableEditIcon' src={editIcon} alt='editIcon' />
            <img className='tableEditIcon' src={deleteIcon} alt='deleteIcon' />
          </div>
        </div>,
      )
    })

    return (
      <div className='table'>
        <div className='tableHeader'>
          {tableHeader.map(tableTitle => (
            <div key={tableTitle} className='tableColumn'>{tableTitle}</div>
          ))}
          <div className='tableColumn' />
        </div>
        <div className='tableValue'>
          {homeworkList}
        </div>
      </div>

    )
  }
}

Homeworks.propTypes = {
  homeworks: PropTypes.arrayOf(HomeworkShape),
  fetchHomeworks: PropTypes.func.isRequired,
}

Homeworks.defaultProps = {
  homeworks: [],
}

const mapStateToProps = state => ({
  homeworks: state.homework.homeworks,
})

export default connect(mapStateToProps, { fetchHomeworks })(Homeworks)
