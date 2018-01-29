import React from 'react'
import { shallow } from 'enzyme'
import { Admin } from '../Admin'

describe('<Admin/>', () => {
  it('should render Admin component without crashing', () => {
    shallow(<Admin />)
  })
  it('should render Admin component with title', () => {
    const wrapper = shallow(<Admin />)
    const title = <div className="homePage">HOMEWORK 管理平台</div>
    expect(wrapper).toContainReact(title)
  })
})
