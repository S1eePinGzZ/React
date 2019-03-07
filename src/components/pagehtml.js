import React, { Component } from 'react';
import Headhtml from './headhtml';
import Pagemain from './page/pagemain';
import { connect } from 'react-redux';
import { requireFloor } from './../redux/pagemsg.redux'


class Pagehtml extends Component {

  componentDidMount(){
      let title = this.props.match.params.pagenumber;
      var dat = {
        title : title ,
        page : 1
      }
      this.props.requireFloor(dat);
    }

  componentDidUpdate(){
    let title = this.props.match.params.pagenumber;
    var dat = {
      title : title ,
      page : this.props.usermsg.pagenum
    }

    console.log(dat);
    this.props.requireFloor(dat);
    }

render() {
  let title = this.props.match.params.pagenumber;
    return (
      <div>
        <Headhtml></Headhtml>
        <Pagemain title = {title}></Pagemain>
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
    requireFloor: (pagecode) => {
      dispatch(requireFloor(pagecode));
      console.log(pagecode);
    }
  }
}

const PageHtml = connect(
  mapStateToProps,
  mapDispatchToProps
)(Pagehtml)


export default PageHtml;
