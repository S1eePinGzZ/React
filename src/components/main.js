import React, { Component } from 'react';
import Leftlist from './main/leftlist'
import Alllist from './main/alllist';
import Headhtml from './headhtml';
import { connect } from 'react-redux';
import { requirePagelist } from './../redux/pagelist.redux'


class MaiN extends Component {

  componentDidMount(){
      let code = this.props.location.pathname.slice(1,this.props.location.pathname.length);
      if(code == '' || code == '全部')
      {
        code = '*';
      }
      console.log(this.props.usermsg.pagenum);
      var dat = {
        code :code ,
        page : 1
      }
      this.props.requirePagelist(dat);
    }

  componentDidUpdate(){
    let code = this.props.location.pathname.slice(1,this.props.location.pathname.length);
    if(code == '' || code == '全部')
    {
      code = '*';
    }
    var dat = {
      code :code ,
      page : this.props.usermsg.pagenum
    }
    this.props.requirePagelist(dat);
    }

render() {
  console.log(this.props);
    return (
      <div>
          <Headhtml></Headhtml>
          <Leftlist></Leftlist>
          <div className='boxs'>
            <Alllist></Alllist>
          </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    usermsg: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requirePagelist: (pagecode) => {
      dispatch(requirePagelist(pagecode));
      console.log(pagecode);
    }
  }
}

const Main = connect(
  mapStateToProps,
  mapDispatchToProps
)(MaiN)

export default Main ;
