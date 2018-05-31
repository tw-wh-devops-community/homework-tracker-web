import React from 'react'
import { shallow } from 'enzyme'
import { Admin } from '../Admin'

describe('<Admin/>', () => {
  it('should render Admin component without crashing', () => {
    shallow(<Admin />)
  })
})
