import React, { Component } from 'react';
import 'element-theme-default';
import { Form } from 'element-react';
import { Popover } from 'element-react';
import { Input } from 'element-react';
import { Button } from 'element-react';
import { Dialog } from 'element-react';
import Emojilist from './../global/emojilist';
import UploadImg from './../global/uploadimg';
import { connect } from 'react-redux';
import { putreplySubmit } from '../../redux/reply.redux'

class Replytable extends Component {    //login页面替换register组件
constructor(props) {
      super(props);
      this.CloseReplytable = this.props.CloseReplytable
    }

render() {
    console.log(this.props.list);
    let dlogtitle = this.props.list.replyfloor == 0 ? '新回复' : "回复" + this.props.list.replyfloor + "楼";
    return (
      <Dialog
        title= {dlogtitle}
        visible={ this.props.list.dialogVisible }
        onCancel={  this.props.close }
      >

        <Dialog.Body>
          <Form model={this.props.list.form}>
          <Form.Item label="回复内容">
            <Input type="textarea" className="replytext" value={this.props.list.replymsg} onChange={this.props.changereply}></Input>
          </Form.Item>
          </Form>
          {
            false ?
            <div>
            <Emojilist addemoji={ this.props.addemoji } ></Emojilist>
            <UploadImg addimg={ this.props.addimg }></UploadImg>
            <Popover className="infoimg"  placement="right" width="250" trigger="hover" content={<div>图片上传后会默认插入到当前内容的最后位置<br/>生成标签 [!img:图片名称]<br/>如果想改变图片位置请上传图片后删除生成标<br/>签，在对应位置添加 [!img:图片名称]标签</div>}>
                <i className="el-icon-information"></i>
            </Popover>
            </div> :
            null
          }

        </Dialog.Body>
        <Dialog.Footer className="dialog-footer">
          <Button onClick={  this.props.close }>取 消</Button>
          {
            this.props.list.replyfloor == 0 ?
            <Button type="primary" onClick={ this.props.autoreply }>确 定</Button>
            :
            <Button type="primary" onClick={ this.props.putreply }>确 定</Button>
          }
        </Dialog.Footer>
      </Dialog>
    )
  }
}

const mapStateToProps = state => {
  return {
    pagemsg: state.pagemsg,
    usermsg: state.user,
    floors:state.reply
  }
}

const mapDispatchToProps = dispatch => {
  return {
    putreplySubmit: (data) => {
      dispatch(putreplySubmit(data));
    }
  }
}

const ReplyTable = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Replytable)

export default ReplyTable;
