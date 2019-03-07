import React, { Component } from 'react';
import { Menu } from 'element-react';
import { Layout } from 'element-react';
import 'element-theme-default';
import { Link } from 'react-router-dom';

class Leftlist extends Component {
render() {
  let left_item = ['全部','前端','后台','安全','网络','视觉设计']
  return (
    <Layout.Col span={3} offset="3">
      <Menu mode="vertical" defaultActive="1" className=" leftlist el-menu-vertical-demo">
          <Menu.ItemGroup title="分类">
          {left_item.map((item,index) => {
            return(
              <Link to ={'/' + item} key={index}>
              <Menu.Item index={item}><i className="el-icon-message"></i>{item}</Menu.Item>
              </Link>
            )
          })}
          </Menu.ItemGroup>
      </Menu>
  </Layout.Col>
    )
  }
  onOpen() {

}

onClose() {

}
}
export default Leftlist;
