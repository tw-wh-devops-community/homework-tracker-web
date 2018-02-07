import React, { Component } from 'react'
import './List.css'
import Bubble from './Bubble'

const listTitles = { inOneHour: '崽啊, 24小时内赶紧把作业看了!', overdue: '崽啊, 赶紧把超期的作业看了吧!' }
// eslint-disable-next-line react/prefer-stateless-function
export class List extends Component {
  render() {
    return (
      <div className="list" >
        <div className="list-title">{ listTitles.inOneHour }</div>
        <Bubble />
      </div>
    )
  }
}

export default List
