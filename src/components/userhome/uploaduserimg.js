import React, { Component } from 'react';
import { Button } from 'element-react';
import { Dialog } from 'element-react';
import { Message } from 'element-react';
import { Upload } from 'element-react';


class Uploaduserimg extends Component {    //login页面替换register组件
  constructor(props) {
    super(props);

    this.state = {
      imageUrl: '',
      imageName: ''
    };
  }

  handleAvatarScucess(res, file) {
    this.setState({ imageName: file.name,imageUrl: URL.createObjectURL(file.raw)});
  }

  beforeAvatarUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    const isLt2M = file.size / 1024 / 10240 < 2;

    if (!isJPG) {
      Message('上传头像图片只能是 JPG 格式!');
    }
    if (!isLt2M) {
      Message('上传头像图片大小不能超过 20MB!');
    }
    return isJPG && isLt2M;
  }

render() {
    const { imageUrl } = this.state;
    return (
      <div className='uploaduserimg_btn'>
      {
        flase ?
        <form enctype="multipart/form-data" action="http://localhost:8089/upload-single" method="post">
          <input type="file" name="myfile"></input>
          <input type="submit" value="提交"></input>
        </form>:
        null
      }

      </div>
    )
  }
}

export default Uploaduserimg;
