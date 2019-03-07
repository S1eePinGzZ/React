import React, { Component } from 'react';
import 'element-theme-default';
import Underbutton from './../global/underbutton';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Alllist extends Component {
  constructor(props) {
  super(props);

  this.state = {
   }
}
render() {
  let data = this.props.data.pagelist;
  console.log(this.props);
  return (
   <div>
      <ul style={{padding:0}}>
         {data.map((item,index) => {
           return (
             <li key={index}>
               <hr></hr>
               <div className='pagelist'>
                 <div className='title'>
                    <Link to ={'/page/' + item.title} key={index}>
                    {item.title}
                    </Link>
                   <div className='introduce'>
                     <p>{item.mainbody}</p>
                   </div>
                   {
                     item.class == undefined ?
                     null :
                     <div className='icon'>
                        <i className="el-icon-message"><span>{item.reportnum}</span></i>
                        <i className="el-icon-menu"><span>{item.class}</span></i>
                     </div>
                   }

                 </div>
                 <div className='autor'>
                    <Link to ={'/user/' + item.author} key={index}>
                    <i className="el-icon-edit"><span>{item.author}</span></i>
                    </Link>
                    <br></br>
                    {
                      item.date == undefined?
                      null :
                      <i className="el-icon-date"><span>{item.date}</span></i>
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
    usermsg: state.user,
    data : state.pagelist
  }
}


const AllList = connect(
  mapStateToProps,
)(Alllist)

export default AllList;
