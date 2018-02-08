import React, { Component } from 'react'
import * as d3 from 'd3'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { BulletinShape } from '../shared/shape'

export class Bubble extends Component {
  componentDidUpdate() {
    this.BubbleChart()
  }

  BubbleChart = () => {
    const data = { children: this.props.assignments.map(assignment => (
       {
        interviewer_name: assignment.interviewer_name,
        responseCount: Math.floor(Math.random() * 5) + 1,
      }
    )) }

    const diameter = 300

    const bubble = d3.pack(data)
      .size([diameter, diameter])
      .padding(1.5)

    const svg = d3.select('svg')
      .attr('width', diameter)
      .attr('height', diameter)
      .attr('class', 'bubble')

    const nodes = d3.hierarchy(data)
      .sum(d => d.responseCount)

    const node = svg.selectAll('.node')
      .data(bubble(nodes).descendants())
      .enter()
      .filter(d => !d.children)
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x} , ${d.y})`)

    node.append('title')
      .text(d => d.interviewer_name)

    node.append('circle')
      .attr('r', d => d.r)
      .style('fill', 'transparent')

    node.append('text')
      .attr('dy', '.3em')
      .style('text-anchor', 'middle')
      .text(d => d.data.interviewer_name.substring(0, d.r / 3))
  }

  render() {
    return (
      <svg width={400} height={400} />
    )
  }
}

Bubble.propTypes = {
  assignments: PropTypes.arrayOf(BulletinShape),
}

Bubble.defaultProps = {
  assignments: [],
}

const mapStateToProps = state => ({
  assignments: state.assignment.assignments,
})

export default connect(mapStateToProps)(Bubble)
