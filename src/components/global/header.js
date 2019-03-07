import React, { Component } from 'react';
import { Menu } from 'element-react';
import 'element-theme-default';
import  userUrl  from './../../img/head.jpg';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutSubmit} from '../../redux/user.redux'


class Head extends Component {
  render() {
    let user = this.props.usermsg.username;
    console.log(this.props);
    return (
      <div>
      { user ?
        <div className="header">
        <Menu theme="light"  className="el-menu-demo" mode="horizontal" onSelect={this.onSelect.bind(this)}>
        <Menu.Item index="1" className="logo"></Menu.Item>
        <Menu.Item index="2" ><Link to ='/'>首页</Link></Menu.Item>
        <Menu.Item index="5">网站说明</Menu.Item>
        <Menu.Item index="3" className="list"><span onClick={() => {this.props.logoutSubmit()}}>退出登录</span></Menu.Item>
        <Menu.SubMenu index="4" className="list" title="账户操作">
        {
          false ?
          <div>
          <Menu.Item index="4-1">修改密码</Menu.Item>
          <Link to ={'/user/' + user}>
            <Menu.Item index="4-2">新回复</Menu.Item>
          </Link>
          <Menu.Item index="4-4">自定义版头</Menu.Item></div>
           :
          null
        }
          <Link to ={'/newpage'}>
            <Menu.Item index="4-3">写文章</Menu.Item>
          </Link>

        </Menu.SubMenu>
        <Menu.Item index="5" className="list">
        <Link to ={'/user/' + user}>
          <img className="headsculpture" src={require('../../user/' + user + '/head.jpg')} alt='' />
          { user }
        </Link>
        </Menu.Item>
        </Menu>
      </div>
      :
      <div className="header">
      <Menu theme="light"  className="el-menu-demo" mode="horizontal" onSelect={this.onSelect.bind(this)}>
      <Menu.Item index="1" className="logo"></Menu.Item>
      <Menu.Item index="2" ><Link to ='/'>首页</Link></Menu.Item>
      <Menu.Item index="5" >网站说明</Menu.Item>
      <Menu.Item index="3" className="list">
        <Link to ={'/register'}>
          注册
        </Link>
      </Menu.Item>
      <Menu.Item index="4" className="list">
        <Link to ={'/login'}>
          登录
        </Link>
      </Menu.Item>
      </Menu>
      </div>
    }
    </div>
    );
  }
  onSelect() {
}
}

const mapStateToProps = state => {
  return {
    usermsg: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logoutSubmit: () => {
      dispatch(logoutSubmit());
      console.log("ss");
    }
  }
}

const Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(Head)

export default Header;
