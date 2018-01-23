import React from 'react'
import {connect} from 'react-redux'
import getHomework from './api'

export class Admin extends React.Component {
  componentWillMount() {
    getHomework()
  }

  render() {
    const interviewer = this.props.homework.interviewer

    return (
      <div className='homepage'>
        {interviewer}
      </div>
    )

  }
}

function mapStateToProps(state) {
  return {
    homework: state.admin.homework
  }
}

export default connect(mapStateToProps)(Admin)