import React, { Component } from 'react';
import 'element-theme-default';
import { Form } from 'element-react';
import { Layout } from 'element-react';
import { Popover } from 'element-react';
import { Input } from 'element-react';
import { Button } from 'element-react';
import registerimg from './../../img/emg.png';
import { connect } from 'react-redux';
import { registerSubmit } from '../../redux/user.redux'

class RegisteR extends Component {
constructor(props) {
  super(props);

  this.state = {
    form: {
      admin:'',
      name:'',
      pass: '',
      checkPass: '',
    },                          //设置表单默认值
    rules: {                    //验证规则
      name:[
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { validator: (rule, value, callback) => {
          let reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
          if (value === '') {
            callback(new Error('请输入用户名'));
          } else if ( reg.test(value) ){
            console.log(value.length);
            if (value.length > 8){
              callback(new Error('用户名不能大于16个字符'));
            }
            callback();
          } else {
            if ( value.length > 16 )
            {
              callback(new Error('用户名不能大于16个字符'))
            }
            callback();
          }
        } }
      ],
      admin:[
          { required: true, message: '请输入要使用的登录账号', trigger: 'blur' },
          { validator: (rule, value, callback) => {
            let reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;   //正则判断是否是汉字
            if (value === '') {
              callback(new Error('请输入要使用的登录账号'));
            } else {
              if (this.state.form.checkPass !== '') {
                this.refs.form.validateField('checkPass');   //如果第二次未变第一次改变调用第二次验证方法
              }
              callback();
            }
          } }
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
            if (this.state.form.checkPass !== '') {
              this.refs.form.validateField('checkPass');   //如果第二次未变第一次改变调用第二次验证方法
            }
            callback();
          }
        } }
      ],
      checkPass: [                //第二次密码验证
        { required: true, message: '请再次输入密码', trigger: 'blur' },
        { validator: (rule, value, callback) => {
          let reg =/^[A-Za-z0-9_!@#$%^&*]{8,16}$/;
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.state.form.pass) {
            callback(new Error('两次输入密码不一致!'));
          } else if ( !reg.test(value) ) {
            callback( new Error('密码为8-16位字母,数字,下划线或特殊字符!@#$%^&*组成'));
          } else {
            callback();
          }
        } }
      ],
    }
  };
}

  handleSubmit(e) {                   //当点击提交时对整个表单进行校验
    e.preventDefault();
    let usermsg = {
      name : this.state.form.name,
      admin : this.state.form.admin,
      pass : this.state.form.pass,
      date : new Date().toLocaleDateString()
    }
    this.refs.form.validate((valid) => {
      if (valid) {
        this.props.registerSubmit(usermsg);
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
    return (
      <div className='registerfrom'>
      <Popover placement="right" title="" width="200" trigger="click" content="这是注册页面，请好好办理注册手续。">
      <img className="registerimg" src={ registerimg } alt='' />
      </Popover>
      <Layout.Col span="8" className='registerfrom2'>
      <span className='formhead'>注册</span>
      <Form ref="form"  model={this.state.form} rules={this.state.rules} labelWidth="100" className="demo-ruleForm">
      <Form.Item label="用户名" prop="name">
        <Input type="text" placeholder="用户名不得超过16个字符" value={this.state.form.name} onChange={this.onChange.bind(this, 'name')} autoComplete="off" />
      </Form.Item>
      <Form.Item label="登录账号" prop="admin">
        <Input type="text" value={this.state.form.admin} onChange={this.onChange.bind(this, 'admin')} autoComplete="off" />
      </Form.Item>
      <Form.Item label="密码" prop="pass">
        <Input type="password" placeholder="密码为8-16位字母,数字,下划线或特殊字符" value={this.state.form.pass} onChange={this.onChange.bind(this, 'pass')} autoComplete="off" />
      </Form.Item>
      <Form.Item label="确认密码" prop="checkPass">
        <Input type="password" value={this.state.form.checkPass} onChange={this.onChange.bind(this, 'checkPass')} autoComplete="off" />
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
    registerSubmit : (usermsg) => {
      dispatch(registerSubmit(usermsg));
      console.log(usermsg)
    }
  }
}

const Register = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisteR)

export default Register;
