import React, { Component } from 'react';
import Headhtml from './headhtml';
import Usermsg from './userhome/usermsg';
import UserPageList from './userhome/userpagelist';
import UserListTable from './userhome/userlisttable';
import { connect } from 'react-redux';
import { requiremaster } from './../redux/master.redux'
import { requiremasterpage } from './../redux/pagelist.redux'
import { requirereplypage } from './../redux/pagelist.redux'
import { requirebereplypage } from './../redux/pagelist.redux'

class Userpage extends Component {
  componentDidMount(){
      let dat = this.props.match.params;
      this.props.requiremaster(dat);
    }

  componentDidUpdate(){
    let dat = this.props.match.params;
    this.props.requiremaster(dat);
    }

render() {
  console.log(this.props.match.params);
  console.log(this.props);
    return (
      <div>
        <Headhtml></Headhtml>
        <Usermsg ></Usermsg>
        <UserListTable></UserListTable>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    usermsg: state.user,
    data : state.newpage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requiremaster: (pagemsg) => {
      dispatch(requiremaster(pagemsg));
      console.log(pagemsg);
    }
  }
}

const UserPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Userpage)

export default UserPage;
