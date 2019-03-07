import React, { Component } from 'react';
import { Button} from 'element-react';
import { Upload } from 'element-react';

class UploadImg extends Component{

render() {
  const fileList2 = [
      ]
  return (
    <Upload
      className="upload-demo"
      action="//jsonplaceholder.typicode.com/posts/"
      onPreview={file => this.handlePreview(file)}
      onRemove={(file, fileList) => this.handleRemove(file, fileList)}
      onError={(file) => console.log(file) }
      onSuccess={ (fback,file) => {this.props.addimg(file.name)} }
      fileList={fileList2}
      listType="picture"
      tip={<div className="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>}
    >
      <Button  type="primary">点击上传</Button>
    </Upload>
  )
}

handleRemove(file, fileList) {
  console.log(file, fileList);
}

handlePreview(file) {
  console.log(file);
}

}

export default UploadImg;
