import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Input, Icon, Button } from 'antd'

import './InterviewerAdmin.css'
// import EditAssignment from './EditAssignment'
import { showModal, fetchInterviewers, showErrorMsg } from './actions'

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
    this.props.showErrorMsg('')
    this.props.showModal()
  }

  search = (name) => {
    this.props.fetchInterviewers(name)
  }

  emitEmpty = () => {
    this.userNameInput.focus()
    this.setState({ name: '' })
  }

  render() {
    const { name } = this.state
    const Search = Input.Search
    const suffix = name ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null
    return (
      <div className='homepage'>
        <div className="header">
          <div className="button-search">
            <Search
              placeholder="请输入..."
              enterButton="Search"
              suffix={suffix}
              size="large"
              value={name}
              onChange={this.handleOnChange('name')}
              onSearch={value => this.search(value)}
              ref={(node) => { this.userNameInput = node }}
            />
          </div>
          <div className="button-new-ass">
            <Button onClick={() => this.changeShowModal()} type="primary">New</Button>
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
  showErrorMsg: PropTypes.func.isRequired,
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
    showErrorMsg,
  })(InterviewerAdmin)
