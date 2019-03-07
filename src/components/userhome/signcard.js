import React, { Component } from 'react';
import { Card } from 'element-react';
import { Form } from 'element-react';
import { Input } from 'element-react';
import { Button } from 'element-react';
import { connect } from 'react-redux';
import { changecardSubmit} from '../../redux/user.redux'

class SignCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
        signcard:'',
        change: false,
        before: '',
      }
    };

onChange(key, value) {
    this.setState({ signcard: value });
    this.forceUpdate();
    console.log(this.state);
  }

ChangeSignCard() {
      let before = this.state.signcard;
      this.setState({ before: before })
      this.setState({ change: true });
      console.log(this.state);
  }

CloseSignCard() {
        let before = this.state.before;
        this.setState({ signcard: before });
        this.setState({ change: false });
        console.log(this.state);
  }

AddSignCard(){
        let data =
          {
              text :this.state.signcard,
              id : this.props.usermsg.username
            }
        this.setState({ change: false });
        console.log(this.state.signcard);
        console.log(data);
        this.props.changecardSubmit(data);
}



render() {
    let change = this.state.change;
    let signcard = this.props.mastermsg.sign;
    let ismaster = this.props.mastermsg.mastername === this.props.usermsg.username ? true : false;
    console.log(ismaster);
    return (
      <Card
            className="box-card"
            header={
              <div className="clearfix">
                <span style={{ "lineHeight": "36px" }}>个人签名</span>
                {
                  ismaster ?
                  <span style={{ "float": "right" }}>
                    <Button type="primary" onClick={this.ChangeSignCard.bind(this)}>修改</Button>
                  </span>
                  :
                  null
                }
              </div>
            }
          >
        {change ?
          <Form model={this.state.form} labelWidth="80" >
             <Input className='signcard_text' type="textarea" value= {this.state.signcard}  onChange={this.onChange.bind(this,'value')}></Input>
              <Form.Item>
                <Button className='signcard_btn' style={{marginRight:10}} onClick={this.CloseSignCard.bind(this)}>取消</Button>
                <Button className='signcard_btn' type="primary" style={{marginLeft:0}} onClick={this.AddSignCard.bind(this)}>完成</Button>
              </Form.Item>
          </Form>
               : <p className='signcard_msg'>{signcard}</p>}
        </Card>
    )
  }
}

const mapStateToProps = state => {
  return {
    usermsg: state.user,
    mastermsg : state.master,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changecardSubmit: (cardmsg) => {
      dispatch(changecardSubmit(cardmsg));
      console.log("ss");
    }
  }
}

const Signcard = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignCard)

export default Signcard;
