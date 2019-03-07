import React, { Component } from 'react';
import { Pagination } from 'element-react';
import 'element-theme-default';
import { connect } from 'react-redux';
import { changenumSubmit } from '../../redux/user.redux'


class Underbutton extends Component {

render() {
  console.log(this.props);
    return (
      <div className="last">
        <div className="block">
          <Pagination layout="prev, pager, next" total={70} onCurrentChange={(currentPage)=>{this.props.changenumSubmit(currentPage);console.log(currentPage)}}/>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    num: state.pagelist,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changenumSubmit: (num) => {
      dispatch(changenumSubmit(num));
      console.log("ss");
    }
  }
}

const UnderButton = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Underbutton)

export default UnderButton;
