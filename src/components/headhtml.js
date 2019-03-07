import React, { Component } from 'react';
import Header from './global/header';
import Showimg from './global/showimg'
import Crumb from './global/crumb';


class Headhtml extends Component {
render() {
    return (
      <div>
        <Header></Header>
        <Showimg></Showimg>
        <Crumb></Crumb>
      </div>
    )
  }
}

export default Headhtml;
