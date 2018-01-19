import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import {shallow} from "enzyme";
import {Admin} from "../Admin";

Enzyme.configure({adapter: new Adapter()});

describe("<Admin/>", ()=> {

  it("should render <Admin/> component", ()=> {
    let props = {
      homework: {},
      fetchHomework: jest.fn()
    };
    const wrapper = shallow(<Admin {...props}/>);
    expect(wrapper.length).toBe(1);
  });

});
