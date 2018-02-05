import React, { Component } from 'react'
import { connect } from 'react-redux'
import Assignments from './Assignments'
import NewAssignment from './NewAssignment'
import DeleteAssignment from './DeleteAssignment'
import { showDeleteModal } from './actions'
import './css/admin.css'

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
      </div>
    )
  }
}

const mapStateToProps = state => ({
  showDeleteModal: state.assignment.changeModal.showDeleteModal,
})

export default connect(mapStateToProps, showDeleteModal )(Admin)
