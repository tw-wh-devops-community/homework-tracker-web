import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Intraday from './Intraday'
import Overdue from './Overdue'
import './AssigmentPage.css'
import { BulletinShape } from '../shared/shape'
import { showPageType, fetchAssignments } from './actions'

const groupCardCount = 10
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

    if ((this.state.index + 1) * groupCardCount < assignments.length) {
      this.setState({
        index: this.state.index + 1,
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
    const currentIndex = this.state.index * groupCardCount
    const nextIndex = (this.state.index + 1) * groupCardCount
    const assignments = this.props.assignments
    const showAssignments = assignments.slice(currentIndex, nextIndex)

    const pageType = this.props.pageType
    const totalPage = Math.ceil(assignments.length / groupCardCount)

    return (
      <div className="content" >
        {pageType === 'intraday' &&
        <Intraday
          showAssignments={showAssignments}
          totalPage={totalPage}
          currentPage={this.state.index + 1}
        />}
        {pageType === 'overdue' &&
        <Overdue
          showAssignments={showAssignments}
          totalPage={totalPage}
          currentPage={this.state.index + 1}
        />}
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
