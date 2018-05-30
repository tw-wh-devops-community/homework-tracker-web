import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Assignments from './Assignments'
import EditAssignment from './EditAssignment'
import NewAssignment from './NewAssignment'
import DeleteAssignment from './DeleteAssignment'
import FinishAssignment from './FinishAssignment'
import './Admin.css'
import ShowAssignmentLog from './ShowAssignmentLog'

export class Admin extends Component {
  state = {
    showModal: false,
  }

  changeShowModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  render() {
    const { showModal } = this.state
    return (
      <div className='homepage'>
        <div className="header">
          <div className="homepage-logo">HOMEWORK 管理平台</div>
          <div className="button-new">
            <button onClick={this.changeShowModal}>New</button>
          </div>
        </div>
        <Assignments />
        { showModal && <NewAssignment onCancel={this.changeShowModal} /> }
        { this.props.showDeleteModal && <DeleteAssignment /> }
        { this.props.showFinishModal && <FinishAssignment /> }
        { this.props.showEditModal && <EditAssignment /> }
        { this.props.showLogModal && <ShowAssignmentLog /> }
      </div>
    )
  }
}

Admin.propTypes = {
  showDeleteModal: PropTypes.bool,
  showFinishModal: PropTypes.bool,
  showEditModal: PropTypes.bool,
  showLogModal: PropTypes.bool,
}

Admin.defaultProps = {
  showDeleteModal: false,
  showFinishModal: false,
  showEditModal: false,
  showLogModal: false,
}

const mapStateToProps = state => ({
  showDeleteModal: state.assignment.changeModal.showDeleteModal,
  showEditModal: state.assignment.changeModal.showEditModal,
  showFinishModal: state.assignment.changeModal.showFinishModal,
  showLogModal: state.assignment.changeModal.showLogModal,
})

export default connect(mapStateToProps)(Admin)
