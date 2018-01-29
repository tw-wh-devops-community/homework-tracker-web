import React from 'react'
import Slider from 'react-slick'
import './List.css'

const settings = {
  dots: false,
  infinite: true,
  speed: 100,
  slidesToShow: 1,
  slidesToScroll: 1,
  vertical: true,
  autoplay: true,
}

const SideList = () => (
  <Slider {...settings}>
    <div><h3>1</h3></div>
    <div><h3>2</h3></div>
    <div><h3>3</h3></div>
    <div><h3>4</h3></div>
    <div><h3>5</h3></div>
    <div><h3>6</h3></div>
  </Slider>
)

export default SideList
