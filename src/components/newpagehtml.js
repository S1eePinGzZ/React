import React, { Component } from 'react';
import Headhtml from './headhtml';
import Newpagetable from './newpage/newpage_table';
class Newpage extends Component {

render() {
    return (
      <div>
        <Headhtml></Headhtml>
        <Newpagetable></Newpagetable>
      </div>
    )
  }
}

export default Newpage;
