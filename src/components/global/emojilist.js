import React, { Component } from 'react';
import { Dropdown } from 'element-react';
import { Tabs } from 'element-react';
import { Button} from 'element-react';
class Emojilist extends Component {
constructor(props) {
        super(props);
        this.state = {
          emj : '😄 😃 😀 😊 😉 😍 😘 😚 😗 😙 😜 😝 😛 😳 😁 😔 😌 😒 😞 😣 😢 😂 😭 😪 😥 😰 😅 😓 😩 😫 😨 😱 😠 😡 😤 😖 😆 😋 😷 😎 😴 😵 😲 😟 😦 😧 😈 👿 😮 😬 😐 😕 😯 😶 😇 😏 😑 👲 👳 👮 👷 💂 👶 👦 👧 👨 👩 👴 👵 👱 👼 👸 😺 😸 😻 😽 😼 🙀 😿 😹 😾 👹 👺 🙈 🙉 🙊 💀 👽 💩 🔥 ✨ 🌟 💫 💥 💢 💦 💧 💤 💨 💛'.split(' ')
        }
      }
      render() {
        return (
          <Dropdown className='emojibtn' trigger='click' menu={(
            <Dropdown.Menu className="emojilist">
              <Tabs type="border-card" activeName="1">
                <Tabs.Pane label="发送表情" name="1">
                  {
                    this.state.emj.map((item,index) => {
                      return(
                        <li key={index} onClick={ () => {this.props.addemoji(item);}}>{item}</li>
                      )
                    })
                  }
                </Tabs.Pane>
                <Tabs.Pane label="配置管理" name="2">配置管理</Tabs.Pane>
              </Tabs>
            </Dropdown.Menu>
            )}
          >
          <Button type="primary">发送表情</Button>
          </Dropdown>
        )
      }
}

export default Emojilist;
