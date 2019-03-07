import React, { Component } from 'react';
import Headhtml from './headhtml';
import Login from './login/login';



class LoginAll extends Component {    //login页面替换register组件
render() {
    return (
      <div>
        <Headhtml></Headhtml>
        <Login></Login>
      </div>
    )
  }
}

export default LoginAll;
