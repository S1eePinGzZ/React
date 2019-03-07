import React, { Component } from 'react';
import Headhtml from './headhtml';
import Register from './register/register';


class RegisterAll extends Component {    //login页面替换register组件

render() {
    return (
      <div>
        <Headhtml></Headhtml>
        <Register></Register>
      </div>
    )
  }
}

export default RegisterAll;
