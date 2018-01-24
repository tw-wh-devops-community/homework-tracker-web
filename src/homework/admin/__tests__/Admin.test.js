import React from 'react'
import { shallow } from 'enzyme'
import { Admin } from '../Admin'

describe('<Admin/>', () => {
  let props = {}
  beforeEach(() => {
    props = {
      fetchHomeworks: jest.fn(),
      homeworks: [],
    }
  })
  it('should render Admin component without crashing', () => {
    shallow(<Admin {...props} />)
  })
  it('should render Admin component with title', () => {
    const wrapper = shallow(<Admin {...props} />)
    const title = <div>HOMEWORK 管理平台</div>
    expect(wrapper).toContainReact(title)
  })
})
