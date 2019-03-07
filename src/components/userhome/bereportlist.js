import React, { Component } from 'react';
import 'element-theme-default';
import Underbutton from './../global/underbutton';
import { Link } from 'react-router-dom';
class BeReportList extends Component {    //login页面替换register组件
  constructor(props) {
  super(props);

  this.state = {
  data: [{
    title: '这是标题1',
    author: '王小虎',
    star: '23',
    time: '2019-2-12',
    replynum: '154',
    class: 'web'
   }, {
     title: '这是标题2',
     author: '王小虎',
     star: '23',
     time: '2019-2-12',
     replynum: '154',
     class: 'web'
   }, {
     title: '这是标题3',
     author: '王小虎',
     star: '23',
     time: '2019-2-12',
     replynum: '154',
     class: 'web'
   }, {
     title: '这是标题4',
     author: '王',
     star: '23',
     time: '2019-2-12',
     replynum: '154',
     class: 'web'
   }, {
     title: '这是标题5',
     author: '王小虎',
     star: '23',
     time: '2019-2-12',
     replynum: '154',
     class: 'web'
   }, {
     title: '这是标题6',
     author: '王小虎',
     star: '23',
     time: '2019-2-12',
     replynum: '154',
     class: 'web'
   }, {
     title: '这是标题7',
     author: '王小虎',
     star: '23',
     time: '2019-2-12',
     replynum: '154',
     class: 'web'
   }]
}
}
  render() {
    return (
      <div className='befor'>
         <ul style={{padding:0}}>
            {this.state.data.map((item,index) => {
              return (
                <li key={index}>
                  <hr></hr>
                  <div className='pagelist'>
                    <div className='title'>
                      <Link to ={'/page/'+item.title} >
                      <p>{item.title}</p>
                      </Link>
                      <div className='introduce'>
                        <Link to ={{pathname:'/page/'+item.title,query:index+1}}>
                        <p className='bereplort_floor'>被回复于54楼</p>
                        </Link>
                      </div>
                      <div className='icon'>
                         <i className="el-icon-star-on"><span>{item.star}</span></i>
                         <i className="el-icon-message"><span>{item.reply}</span></i>
                         <i className="el-icon-menu"><span>{item.class}</span></i>
                      </div>
                    </div>
                    <div className='autor'>
                       <Link to ={'/user/'+item.author} >
                        <i className="el-icon-edit"><span>{item.author}</span></i>
                       </Link>
                       <br></br>
                      <i className="el-icon-date"><span>{item.time}</span></i>
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

export default BeReportList;
