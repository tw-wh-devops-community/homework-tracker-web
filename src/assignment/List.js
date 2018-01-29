import React from 'react'
import Slider from 'react-slick'
import AssignmentPage from './AssignmentPage'
import './List.css'

const settings = {
  dots: false,
  infinite: true,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
  vertical: true,
  autoplay: false,
}

const Assignments = () => (
  <Slider {...settings}>
    <div className="container-1">
      <AssignmentPage title="24小时内需处理完的作业名单（2018年1月）" />
    </div>
    <div className="container-2">
      <AssignmentPage title="已经超期的作业名单（2018年1月）" />
    </div>
  </Slider>
)

export default Assignments
