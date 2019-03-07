import React, { Component } from 'react';
import  userUrl  from './../../img/head.jpg';
import { Layout } from 'element-react';
import { Popover } from 'element-react';
import Underbutton from './../global/underbutton';
import { Collapse } from 'element-react';
import { Button } from 'element-react';
import Replytable from './replytable';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { putreplySubmit } from '../../redux/reply.redux'

class Pagemain extends Component {    //login页面替换register组件
  constructor(props) {
    super(props);
    this.state = {
      dialogVisible: false,
      replyfloor : 0,
      bereply_author : '',
      replymsg : '',
    };
  }

 CloseReplytable () {
    this.setState({ dialogVisible: false });
  }

ChangeReply (value) {
   this.setState({ replymsg : value });
   this.forceUpdate();
}

PutReply (){
  let data ={
    date : new Date().toLocaleDateString(),
    isreply : 1,
    reply_floor : this.state.replyfloor,
    reply_msg : this.state.replymsg,
    reply_author : this.props.usermsg.username,
    reply_title : this.props.title,
    bereply_author : this.state.bereply_author
  }
  console.log(data);
  this.props.putreplySubmit(data);
  this.CloseReplytable ();
  console.log(data);
}

AutoReply (){
  let data ={
    date : new Date().toLocaleDateString(),
    isreply : 0,
    reply_floor : 0,
    reply_msg : this.state.replymsg,
    reply_author : this.props.usermsg.username,
    reply_title : this.props.title
  }
  this.props.putreplySubmit(data);
  this.CloseReplytable ();
  console.log(data);
}

AddEmoji (value) {
  this.setState({ replymsg : this.state.replymsg + value });
  this.forceUpdate();
}

AddImg (imgname) {
  this.setState({ replymsg : this.state.replymsg + '\n[!img:' + imgname + ']\n' });
}

render() {
  let pagemsg = this.props.pagemsg.floors;
  console.log(this.state);
    return (
      <div>
      <Layout.Row>
      <Layout.Col  className='pagehtml_all' span="22" offset='1'>
      {pagemsg.map((item,index) => {
        return(
        <Layout.Col  className='pagemain' key={index}>
          <Layout.Col span="5" className='askleft'>
            <div className="triangle_border_nw" id={'floor_'+(index+1)}>
              <span>{ index+1 }</span>
            </div>
            <img className="askleft_img" src={require('./../../user/' + item.author + '/head.jpg')} alt='' />
            <p className='author_link'>
              <Link to ={'/user/'+item.author} >
                {item.author}
              </Link>
            </p>
          </Layout.Col>
          <Layout.Col span="19" className='askright'>
            <i className="el-icon-time"><span>{item.date}</span></i>
            <div className='pagemsg'>
            {
              item.isreply==1 ?
              <Layout.Row className='reply_1'>
              <Layout.Col span="23">
                <Collapse>
                  <Collapse.Item title="点击查看回复楼层" name="1" className="reply_2">
                  <div className='reply_text'>
                    <p>
                      {item.bereplymsg}
                    </p>
                  </div>
                  </Collapse.Item>
                </Collapse>
              </Layout.Col>
              </Layout.Row>
              :
              null
            }

              <div>
                <p>{item.replymsg}</p>
              </div>
            </div>
            {
              this.props.usermsg.username != '' ?
              <Popover placement="top-start"  width="30" trigger="hover" content="回复该楼层">
                  <i className="el-icon-plus replybtn"><span onClick={ () => {this.setState({ dialogVisible: true });this.setState({bereply_author : item.author});this.setState({ replyfloor : index+1 });}} >回复</span></i>
              </Popover>
              :
              null
            }
          </Layout.Col>
        </Layout.Col>)
      })}
      <Replytable list = {this.state} close = {this.CloseReplytable.bind(this)} addimg = {this.AddImg.bind(this)}  addemoji = {this.AddEmoji.bind(this)}  changereply = {this.ChangeReply.bind(this)} putreply = {this.PutReply.bind(this)} autoreply = {this.AutoReply.bind(this)}> </Replytable>
      </Layout.Col>
      </Layout.Row>
      {
        this.props.usermsg.username != ''?
        <Layout.Row>
          <Layout.Col span='2' offset='11'>
            <div className='new_floor' onClick={ () => {this.setState({ dialogVisible: true });this.setState({ replyfloor : 0 })}}>
              <span>新回复</span>
            </div>
          </Layout.Col>
        </Layout.Row>
        :
        null
      }

      <Underbutton></Underbutton>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    pagemsg: state.pagemsg,
    usermsg: state.user,
    list:state.reply
  }
}

const mapDispatchToProps = dispatch => {
  return {
    putreplySubmit: (data) => {
      dispatch(putreplySubmit(data));
    }
  }
}

const PageMain = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Pagemain)

export default PageMain;
