import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './InterviewerAdmin.css'
// import EditAssignment from './EditAssignment'
import { showModal, fetchInterviewers } from './actions'

import NewInterviewer from './NewInterviewer'
import Interviewers from './Interviewers'

export class InterviewerAdmin extends Component {
  state = {
    name: '',
  }

  handleOnChange = field => (event) => {
    this.setState({
      [field]: event.target.value,
    })
  }

  changeShowModal = () => {
    this.props.showModal()
  }

  search = (name) => {
    // console.log(name)
    this.props.fetchInterviewers(name)
  }

  render() {
    const { name } = this.state
    return (
      <div className='homepage'>
        <div className="header">
          <div className="button-search">
            <input className='input' type="text" onChange={this.handleOnChange('name')} value={name} />
            <button onClick={() => this.search(name)}>Search</button>
          </div>
          <div className="button-new">
            <button onClick={() => this.changeShowModal()}>New</button>
          </div>
        </div>
        <Interviewers />
        {this.props.showNewModal && <NewInterviewer onCancel={() => this.changeShowModal()} />}
        {this.props.showEditModal && <NewInterviewer />}
      </div>
    )
  }
}

InterviewerAdmin.propTypes = {
  showEditModal: PropTypes.bool,
  showNewModal: PropTypes.bool,
  showModal: PropTypes.func.isRequired,
  fetchInterviewers: PropTypes.func.isRequired,
}

InterviewerAdmin.defaultProps = {
  showEditModal: false,
  showNewModal: false,
}

const mapStateToProps = state => ({
  showEditModal: state.interviewer.changeModal.showEditModal,
  showNewModal: state.interviewer.changeModal.showNewModal,
})

export default connect(mapStateToProps,
  {
    showModal,
    fetchInterviewers,
  })(InterviewerAdmin)
