import React from 'react'
import { shallow } from 'enzyme'
import { Homeworks } from '../Homeworks'

describe('<Homeworks/>', () => {
  let props = {}
  beforeEach(() => {
    props = {
      fetchHomeworks: jest.fn(),
      homeworks: [],
    }
  })
  it('should render Homeworks component without crashing', () => {
    shallow(<Homeworks {...props} />)
  })
  it('should render Homeworks component with table header', () => {
    const wrapper = shallow(<Homeworks {...props} />)
    const tableHeader = <div className="tableColumn">面试官</div>
    expect(wrapper).toContainReact(tableHeader)
  })
})
