import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Intraday from './Intraday'
import Overdue from './Overdue'
import './AssigmentPage.css'
import { BulletinShape } from '../shared/shape'
import { showPageType, fetchAssignments } from './actions'

const groupCardCount = 16
export class AssignmentPage extends Component {
  state = {
    index: 0,
  }

  componentWillMount() {
    const pageType = this.props.pageType
    this.props.fetchAssignments(pageType)
  }

  componentDidMount() {
    setInterval(() => {
      this.setIndex()
    }, 5000)
  }

  setIndex = () => {
    const assignments = this.props.assignments

    if (this.state.index + groupCardCount < assignments.length) {
      this.setState({
        index: this.state.index + groupCardCount,
      })
    } else {
      this.props.showPageType(this.props.pageType)
      this.props.fetchAssignments(this.props.pageType)
      this.setState({
        index: 0,
      })
    }
  }

  render() {
    const showAssignments = this.props.assignments
    const pageType = this.props.pageType

    return (
      <div className="content" >
        {pageType === 'intraday' && <Intraday showAssignments={showAssignments.slice(this.state.index, this.state.index + groupCardCount)} />}
        {pageType === 'overdue' && <Overdue showAssignments={showAssignments.slice(this.state.index, this.state.index + groupCardCount)} />}
      </div>
    )
  }
}

AssignmentPage.propTypes = {
  assignments: PropTypes.arrayOf(BulletinShape),
  pageType: PropTypes.string.isRequired,
  fetchAssignments: PropTypes.func.isRequired,
  showPageType: PropTypes.func.isRequired,
}

AssignmentPage.defaultProps = {
  assignments: [],
}

const mapStateToProps = state => ({
  pageType: state.assignmentPage.showPageType,
  assignments: state.assignmentPage.assignments,
})

export default connect(mapStateToProps, { fetchAssignments, showPageType })(AssignmentPage)
