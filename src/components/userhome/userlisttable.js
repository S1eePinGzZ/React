import React, { Component } from 'react';
import { Tabs } from 'element-react';
import { Badge } from 'element-react';
import UserPageList from './userpagelist';
import AllList from './../main/alllist';
import BeReportList from './bereportlist';
import { connect } from 'react-redux';
import { requiremasterpage } from './../../redux/pagelist.redux'
import { requirereplypage } from './../../redux/pagelist.redux'


class Userlisttable extends Component {    //login页面替换register组件
  componentDidMount(){
    console.log(this.props);
      let dat = {
        master: this.props.mastermsg
      }
      this.props.requiremasterpage(dat);
    }

  componentDidUpdate(){
    let dat = {
      master: this.props.mastermsg
    }
    this.props.requiremasterpage(dat);
    }


    requirebereplypage(name){
      console.log(name);
      if(name.key == '.1'){
        let dat = {
          master: this.props.mastermsg
        }
        console.log(dat);
        this.props.requirereplypage(dat);
      }
      else{
        let dat = {
          master: this.props.mastermsg
        }
        this.props.requiremasterpage(dat);
      }
      }

  render() {
    let ismaster = this.props.mastermsg == this.props.usermsg ? true : false;
    console.log(this.props);
    const BeReplyed = <Badge isDot><span>被@回复</span></Badge>
    return (
      <Tabs activeName="1" className='boxs_2' onTabClick={(name)=>this.requirebereplypage(name)}>
        <Tabs.Pane label="发布主题" name="1" >
          <UserPageList>
          </UserPageList>
        </Tabs.Pane>
        <Tabs.Pane  label="回复主题" name="2">
          <AllList>
          </AllList>
        </Tabs.Pane>
        {
            false ?
            <Tabs.Pane label={BeReplyed} name="3">
              <BeReportList>
              </BeReportList>
            </Tabs.Pane>
            :
            null
        }
      </Tabs>
    )
  }
}

const mapStateToProps = state => {
  return {
    usermsg: state.user.username,
    mastermsg : state.master.mastername,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requirereplypage: (data) => {
      dispatch(requirereplypage(data));
    },
    requiremasterpage: (data) => {
      dispatch(requiremasterpage(data));
    }
  }
}

const UserListTable = connect(
  mapStateToProps,mapDispatchToProps
)(Userlisttable)


export default UserListTable;
