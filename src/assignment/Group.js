import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Card from './Card'
import './Group.css'

export class Group extends Component {
  state = {
    index: 0,
  }

  componentDidMount() {
    setInterval(() => {
      this.setIndex()
    }, 10000)
  }

  setIndex = () => {
    const assignments = this.props.assignments
    if (this.state.index + 4 < assignments.length) {
      this.setState({
        index: this.state.index + 4,
      })
    } else {
      this.setState({
        index: 0,
      })
    }
  }

  render() {
    const showAssignments = this.props.assignments

    return (
      <div className="group" >
        <Card showAssignments={showAssignments.slice(this.state.index, this.state.index + 4)} />
      </div>
    )
  }
}

Group.propTypes = {
  assignments: PropTypes.arrayOf.isRequired,
}

const mapStateToProps = state => ({
  assignments: state.assignment.assignments,
})

export default connect(mapStateToProps)(Group)
