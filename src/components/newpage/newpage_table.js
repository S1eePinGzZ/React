import React, { Component } from 'react';
import 'element-theme-default';
import { Form } from 'element-react';
import { Layout } from 'element-react';
import { Popover } from 'element-react';
import { Input } from 'element-react';
import { Select } from 'element-react';
import { Button } from 'element-react';
import Emojilist from './../global/emojilist';
import UploadImg from './../global/uploadimg';
import { connect } from 'react-redux';
import { newpageSubmit } from '../../redux/user.redux'

class Newpage_table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        title: '',
        text: '',
        class: '',
      }
    };
  }

  onSubmit(e) {
    e.preventDefault();
  }

  onChange(key, value) {
    let changemsg = this.state.form;
    changemsg[key] = value;
    this.setState({ form : changemsg });
    this.forceUpdate();
    console.log(this.state);
  }

  AddEmoji (value) {
    let changemsg = this.state.form;
    changemsg.text = changemsg.text + value;
    this.setState({ form : changemsg });
    this.forceUpdate();
  }

  AddImg (imgname) {
    let changemsg = this.state.form;
    changemsg.text = changemsg.text + '\n[!img:' + imgname + ']\n';
    this.setState({ form : changemsg });
  }

putPage(){
  let data = {
    author: this.props.usermsg.username,
    title: this.state.form.title,
    class: this.state.form.class,
    text: this.state.form.text,
    mainbody: this.state.form.text.slice(0,50),
    date: new Date().toLocaleDateString(),
  }
  console.log(data);
  this.props.newpageSubmit(data);
}

render() {
  console.log(this.props);
    return (
      <Layout.Row className='newpage'>
      <Layout.Col span='12' offset='6'>
      <Form labelPosition='top' model={this.state.form} labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
        <Form.Item label="分类/分区">
          <Select value={this.state.form.region} onChange={this.onChange.bind(this, 'class')} placeholder="请选择分类/分区">
            <Select.Option label="前端" value="前端"></Select.Option>
            <Select.Option label="后台" value="后台"></Select.Option>
            <Select.Option label="安全" value="安全"></Select.Option>
            <Select.Option label="网络" value="网络"></Select.Option>
            <Select.Option label="视觉设计" value="视觉设计"></Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="标题" className='new_title'>
          <Input value={this.state.form.title} onChange={this.onChange.bind(this, 'title')}></Input>
        </Form.Item>
        <Form.Item label="文章内容">
          <Input type="textarea" className="new_text" value={this.state.form.text} onChange={this.onChange.bind(this, 'text')}></Input>
        </Form.Item>
        {
          false ?
          <div>
          <Emojilist addemoji={ this.AddEmoji.bind(this) } ></Emojilist>
          <UploadImg addimg={ this.AddImg.bind(this) }></UploadImg>
          <Popover className="infoimg"  placement="right" width="250" trigger="hover" content={<div>图片上传后会默认插入到当前内容的最后位置<br/>生成标签 [!img:图片名称]<br/>如果想改变图片位置请上传图片后删除生成标<br/>签，在对应位置添加 [!img:图片名称]标签</div>}>
              <i className="el-icon-information"></i>
          </Popover>
          </div> :
          null
        }

        <div>
          <Button type="primary" onClick={this.putPage.bind(this)}>发表文章</Button>
        </div>
      </Form>
      </Layout.Col>
      </Layout.Row>
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
    newpageSubmit: (pagemsg) => {
      dispatch(newpageSubmit(pagemsg));
      console.log(pagemsg);
    }
  }
}

const Newpage_Table = connect(
  mapStateToProps,
  mapDispatchToProps
)(Newpage_table)

export default Newpage_Table;
