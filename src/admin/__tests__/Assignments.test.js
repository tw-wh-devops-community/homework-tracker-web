import React from 'react'
import { shallow } from 'enzyme'
import { Assignments } from '../Assignments'

describe('<Assignments/>', () => {
  let props = {}
  beforeEach(() => {
    props = {
      fetchAssignments: jest.fn(),
      showFinishModal: jest.fn(),
      showDeleteModal: jest.fn(),
      setSelectAssignmentId: jest.fn(),
      assignments: [],
    }
  })
  it('should render Homeworks component without crashing', () => {
    shallow(<Assignments {...props} />)
  })
  it('should render Homeworks component with table header', () => {
    const wrapper = shallow(<Assignments {...props} />)
    const tableHeader = <div className="table-column">面试官</div>
    expect(wrapper).toContainReact(tableHeader)
  })
})
