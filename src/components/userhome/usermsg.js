import React, { Component } from 'react';
import { Layout } from 'element-react';
import Uploaduserimg from './uploaduserimg';
import 'element-theme-default';
import SignCard from './signcard';
import  userUrl  from './../../img/head.jpg';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Usermsg extends Component {    //login页面替换register组件
  constructor(props) {
    super(props);

    this.state = {
      dialogVisible: false
    };
  }

  CloseUploadtable () {
     this.setState({ dialogVisible: false });
     console.log('close');
   }

   OpenUploadtable () {
      this.setState({ dialogVisible: true });
      console.log('open');
    }

render() {
    let mastermsg = this.props.mastermsg;
    let ismaster = this.props.mastermsg.mastername === this.props.usermsg.username ? true : false;
    console.log(this.props);
    return (
      <Layout.Row>
        <Layout.Col span='16' offset='4' className='usermsg'>
            <Layout.Col span='5' offset='2' className='usermsg_img'>
            {
              this.props.mastermsg.mastername !='' ?
              <img src={require('../../user/' + this.props.mastermsg.mastername + '/head.jpg')} alt='/'/>
              :
              null
            }

                {
                  ismaster ?
                  <Uploaduserimg
                  opentable={this.OpenUploadtable.bind(this)}
                  closetable={this.CloseUploadtable.bind(this)}
                  visible={this.state.dialogVisible}
                  ></Uploaduserimg>
                  :
                  null
                }

            </Layout.Col>
            <Layout.Col span='5'>
                <div className='usermsg_list'>
                  <ul>
                    <li>{mastermsg.mastername}</li>
                    <li><i className="el-icon-edit"></i>帖子数：{mastermsg.allpagenum}</li>
                    <li><i className="el-icon-date"></i>注册日期：{mastermsg.register_date}</li>
                  </ul>
                </div>
            </Layout.Col>
            <Layout.Col span='7' offset='4' className='signcard'>
                <SignCard></SignCard>
            </Layout.Col>
        </Layout.Col>
      </Layout.Row>
    )
  }
}


const mapStateToProps = state => {
  return {
    usermsg: state.user,
    mastermsg : state.master,
  }
}

const UserMsg = connect(
  mapStateToProps
)(Usermsg)


export default UserMsg;
