import React, { Component } from 'react';
import 'element-theme-default';
import { Form } from 'element-react';
import { Layout } from 'element-react';
import { Popover } from 'element-react';
import { Input } from 'element-react';
import { Button } from 'element-react';
import registerimg from './../../img/emg.png';
import { connect } from 'react-redux';
import { loginSubmit } from '../../redux/user.redux'

class Login extends Component {
constructor(props) {
  super(props);

  this.state = {
    form: {
      user:'',
      pass: '',
    },                          //设置表单默认值
    rules: {                    //验证规则
      user:[
          { required: true, message: '请输入要使用的登录账号', trigger: 'blur' },
          { validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入要使用的登录账号'));
            } else {
              callback();
              }
            }
          }
      ],
      pass: [                   //第一次密码验证
        { required: true, message: '请输入密码', trigger: 'blur' },
        { validator: (rule, value, callback) => {
          let reg =/^[A-Za-z0-9_!@#$%^&*]{8,16}$/;  //密码正则密码为8-16位字母,数字,下划线或特殊字符!@#$%^&*组成
          if (value === '') {
            callback(new Error('请输入密码'));
          } else if ( !reg.test(value) ) {
            callback( new Error('密码为8-16位字母,数字,下划线或特殊字符!@#$%^&*组成'));
          } else {
            callback();
          }
        }
      }
      ],
    }
  };
}

  handleSubmit(e) {                   //当点击提交时对整个表单进行校验
    e.preventDefault();
    let username = this.state.form;
    this.refs.form.validate((valid) => {
      if (valid) {
        this.props.loginSubmit(username);
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }

  handleReset(e) {                    //表单重置，重置数据和校验结果
    e.preventDefault();
    console.log(this.state.form);
    this.refs.form.resetFields();
  }

  onChange(key, value) {                   //onChange设置表单数据
    this.setState({
      form: Object.assign({}, this.state.form, { [key]: value })
    });
  }

render() {
    console.log(this.props);
    return (
      <div className='registerfrom'>
      <Popover placement="right" title="" width="200" trigger="click" content="请使用帐号密码进行登录。">
      <img className="registerimg" src={ registerimg } alt='' />
      </Popover>
      <Layout.Col span="8" className='registerfrom2'>
      <span className='formhead'>登录</span>
      <Form ref="form"  model={this.state.form} rules={this.state.rules} labelWidth="100" className="demo-ruleForm">
      <Form.Item label="登录账号" prop="user">
        <Input type="text" value={this.state.form.user} onChange={this.onChange.bind(this, 'user')} autoComplete="off" />
      </Form.Item>
      <Form.Item label="密码" prop="pass">
        <Input type="password" placeholder="密码为8-16位字母,数字,下划线或特殊字符" value={this.state.form.pass} onChange={this.onChange.bind(this, 'pass')} autoComplete="off" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={this.handleSubmit.bind(this)}>提交</Button>
        <Button onClick={this.handleReset.bind(this)}>重置</Button>
      </Form.Item>
    </Form>
    </Layout.Col>
    </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginSubmit : (usermsg) => {
      dispatch(loginSubmit(usermsg));
      console.log(usermsg)

    }
  }
}

const Loging = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)


export default Loging;
