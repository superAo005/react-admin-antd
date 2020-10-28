import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import './index.css';
import 'antd/dist/antd.css'
import './utils/i18n'
import App from './App'
import { mainRoutes } from './routes'
import * as serviceWorker from './serviceWorker';
import notFound from './views/error/notFound'

ReactDOM.render(
  <BrowserRouter>
      {/* Switch组件做性能优化一旦匹配到路由就停止匹配 */}
      <Switch>
        {/* 所有/admin路径转发给App.js*/}
        <Route path="/admin" component={App}></Route>
        {/* 主要路由直接匹配 */}
        { mainRoutes.map((route)=>{
          // return <Route key={route.path} component={route.component}></Route>
          return <Route key={route.path} {...route}></Route>
        }) }
      </Switch>
      {/* 如果上面遍历中没有找到路由则会执行当前重定向路由404 */}
      {/* <Redirect to="/404"></Redirect> */}
      <Route key='/*' path='/*' component={notFound}></Route>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
