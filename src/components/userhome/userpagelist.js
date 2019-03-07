import React, { Component } from 'react';
import { Button } from 'element-react';
import { Badge } from 'element-react';
import 'element-theme-default';
import Underbutton from './../global/underbutton';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Alllist extends Component {
  constructor(props) {
  super(props);

  this.state = {
  data: []
}
}
render() {
  let ismaster = this.props.mastermsg == this.props.usermsg ? true : false;
  let pagelist = this.props.pagelist;
  console.log(this.props);
  return (
   <div>
      <ul style={{padding:0}}>
         {pagelist.map((item,index) => {
           return (
             <li key={index}>
               <hr></hr>
               <div className='userpage_list'>
                 <div className='title'>
                   <Link to ={'/page/'+item.title} >
                    {item.title}
                   </Link>
                   <div className='introduce'>
                     <p>{item.mainbody}</p>
                   </div>
                   <div className='icon'>
                      <i className="el-icon-message"><span>{item.reply}</span></i>
                      <i className="el-icon-menu"><span>{item.class}</span></i>
                   </div>
                 </div>
                 <div>
                 {
                   false ?
                   <Badge value={ 3 } style={{marginRight:30,marginTop:20}}>
                     <Button  plain={true} type="info">
                     <Link to ={'/page/'+item.title} >
                      新回复
                     </Link>
                     </Button>
                   </Badge>
                   :
                   null
                 }
                 </div>
               </div>
             </li>
           )
         })}
      </ul>
      <Underbutton>
      </Underbutton>
   </div>
 )
  }
}

const mapStateToProps = state => {
  return {
    usermsg: state.user.username,
    mastermsg : state.master.mastername,
    pagelist : state.pagelist.pagelist,
  }
}

const AllList = connect(
  mapStateToProps
)(Alllist)

export default AllList;
