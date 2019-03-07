import React, { Component } from 'react';
import  imgurl  from './../../img/indeximg.png';
class Showimg extends Component {
  render() {
    return (
      <div className="showimg" style={{ backgroundImage: "url(" + imgurl + ")" }}></div>
    )
  }
}

export default Showimg;
