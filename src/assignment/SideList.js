import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ReactList from 'react-list'
import './List.css'

export default class SideList extends Component {
  test = () => {
    this.list.scrollTo(this.props.assignments.length - 1)
  }

  renderItem = (index, key) => {
    const itemClass = classNames({
      'interviewer-item': true,
      'highlight-item': index % 2 === 1,
    })
    const nameClass = classNames({
      'interviewer-name': true,
      'selected-item': index === 0,
    })
    const roleClass = classNames({
      'interviewer-role': true,
      'selected-item': index === 0,
    })
    const item = this.props.assignments[index]
    return (
      <div key={key} className={itemClass}>
        <div className={nameClass}>{item.interviewer}</div>
        <div className={roleClass}>{item.role}面试官</div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <div style={{ overflow: 'auto', maxHeight: 400 }}>
          <ReactList
            ref={(list) => { this.list = list }}
            itemRenderer={this.renderItem}
            length={this.props.assignments.length}
            type="uniform"
          />
        </div>
        <button onClick={this.test} />
      </div>
    )
  }
}

SideList.propTypes = {
  assignments: PropTypes.arrayOf(PropTypes.shape()),
}

SideList.defaultProps = {
  assignments: [
    { id: '1', interviewer: '张一', role: 'DEV' },
    { id: '2', interviewer: '张二', role: 'DEV' },
    { id: '3', interviewer: '张三', role: 'DEV' },
    { id: '4', interviewer: '张四', role: 'DEV' },
    { id: '5', interviewer: '张五', role: 'DEV' },
    { id: '6', interviewer: '张六', role: 'DEV' },
    { id: '7', interviewer: '张七', role: 'DEV' },
    { id: '8', interviewer: '张八', role: 'DEV' },
    { id: '9', interviewer: '张九', role: 'DEV' },
    { id: '10', interviewer: '李十', role: 'BA' },
    { id: '11', interviewer: '李十一', role: 'BA' },
    { id: '12', interviewer: '李十二', role: 'BA' },
    { id: '13', interviewer: '李十三', role: 'BA' },
  ],
}
