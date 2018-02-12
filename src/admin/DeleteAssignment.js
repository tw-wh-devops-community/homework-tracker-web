import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { showDeleteModal, deleteAssignment } from './actions'
import './NewAssignment.css'

class DeleteAssignment extends Component {
  delete = () => {
    this.props.deleteAssignment(this.props.assignmentId)
    this.props.showDeleteModal()
  }

  render() {
    return (
      <div className='container'>
        <div className='modal-container modal-delete'>
          <div className='new-title'>确定删除么?</div>
          <div className='button-container'>
            <button className='button cancel' onClick={() => this.props.showDeleteModal()} >取消</button>
            <button className='button confirm' onClick={this.delete}>确认</button>
          </div>
        </div>
      </div>
    )
  }
}

DeleteAssignment.propTypes = {
  assignmentId: PropTypes.string.isRequired,
  showDeleteModal: PropTypes.func.isRequired,
  deleteAssignment: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  assignmentId: state.assignment.setAssignmentId.selectAssignmentId,
})

export default connect(mapStateToProps, { showDeleteModal, deleteAssignment })(DeleteAssignment)

