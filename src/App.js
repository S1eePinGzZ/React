import React, { Component } from 'react';
import Main from './components/main';
import Pagehtml from './components/pagehtml'
import Register from './components/registerall'
import Userpage from './components/userpage'
import Loginall from './components/loginall';
import NewPage from './components/newpagehtml';
import Headhtml from './components/headhtml';
import { BrowserRouter,Route,Switch,Redirect } from 'react-router-dom';
class App extends Component {
render() {
    return (
      <BrowserRouter>
        <div>
            <Switch>
              <Route path="/newpage" exact component={NewPage} />
              <Route path="/newpage" exact component={NewPage} />
              <Route path="/user/:id" exact component={Userpage} />
              <Route path="/page/:pagenumber" exact component={Pagehtml} />
              <Route path="/register" exact component={Register} />
              <Route path="/login" exact component={Loginall} />
              <Route path="/"  component={Main}/>
              <Route path="/:code"  component={Main}/>
              <Redirect to='/'/>
            </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
