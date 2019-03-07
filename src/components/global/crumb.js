import React, { Component } from 'react';
import { Breadcrumb } from 'element-react';
import { Link } from 'react-router-dom';
import 'element-theme-default';
import { connect } from 'react-redux';
class CrumB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urllist : [],
      linklist : '',
    };
  }

Dourl (){
  let test = window.location.href;
  let search = window.location.search.slice(1)
  console.log('x:' + test.indexOf('?'));
  if(test.indexOf('?') > 0){
    test = test.slice(0,test.indexOf('?'));
  }
  console.log('参数：' + test);
  let url = test.split('/');
  url = url.splice(3,url.length);
  let link = '';
  let list_all = {
    urllist : [],
    linklist : [],
  };
  console.log(this.state.urllist);
  switch(url[0])
  {
    case 'page' : url[0] = '文章';
                  link = '';
    break;
    case 'user' : url[0] = '用户主页';
                  if(this.props.usermsg.username != '')
                  {
                    link = 'user/' + this.props.usermsg.username
                  }
                  else{
                    link = 'login'
                  };
    break;
    case 'login' : url[0] = '登录';
                  link = 'login';
    break;
    case 'register' : url[0] = '注册';
                      link = 'register';
    break;
    case 'newpage' : url[0] = '发表文章';
                      link = 'newpage';
    break;
    default : url[0] = '未知路径';
    break;
  }
  console.log('link:' + link);
  this.setState({ linklist : link });
  return url
}

getUrlParms(name) {
    var r = name;
    if (r != null)
        return decodeURI(r);
    return null;
}

resolveurl() {
  let list = this.Dourl();
  if(list.length == 2)
  {
    list[1] = this.getUrlParms(list[1])
  }
  return list;
}

componentDidMount(){
  this.setState({ urllist : this.resolveurl() });

}

componentWillReceiveProps(){
    let url = this.resolveurl();
    this.setState({ urllist : url });
  }

render() {
  let urllist = this.state.urllist;
  console.log(this.state);
  return (
    <Breadcrumb separator="/" className="crumb">
    <Breadcrumb.Item>
    <Link to ={'/'}>
      首页
    </Link>
    </Breadcrumb.Item>
    {
      urllist[0]=='未知路径' ?
      <Breadcrumb.Item>全部列表</Breadcrumb.Item>
      :
      urllist.map((item,index) =>{
        return(
        <Breadcrumb.Item key={index}>
        <Link to ={'/'+this.state.linklist}>
          {item}
        </Link>
        </Breadcrumb.Item>
      )})
    }
    </Breadcrumb>
    )
  }
}

const mapStateToProps = state => {
  return {
    usermsg: state.user
  }
}


const Crumb = connect(
  mapStateToProps,
)(CrumB)


export default Crumb;
