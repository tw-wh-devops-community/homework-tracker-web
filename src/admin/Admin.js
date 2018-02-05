import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Assignments from './Assignments'
import NewAssignment from './NewAssignment'
import DeleteAssignment from './DeleteAssignment'
import FinishAssignment from './FinishAssignment'
import './Admin.css'

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
      </div>
    )
  }
}

Admin.propTypes = {
  showDeleteModal: PropTypes.bool,
  showFinishModal: PropTypes.bool,
}

Admin.defaultProps = {
  showDeleteModal: false,
  showFinishModal: false,
}

const mapStateToProps = state => ({
  showDeleteModal: state.assignment.changeModal.showDeleteModal,
  showFinishModal: state.assignment.changeModal.showFinishModal,
})

export default connect(mapStateToProps)(Admin)
