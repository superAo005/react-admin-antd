import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
// import { createStore, combineReducers } from 'redux'
import './index.css';
// import 'antd/dist/antd.css'
import '@/utils/i18n'
import App from './App'
import { mainRoutes } from '@/routes'
import * as serviceWorker from './serviceWorker'
import { Provider } from "react-redux";
import store from "@/redux/store";


// redux 中三个重要部分: action reducer state(store)

ReactDOM.render(
  // 全局注册使用redux
  <Provider store={store}>
    <BrowserRouter>
        {/* Switch组件做性能优化一旦匹配到路由就停止匹配 */}
        <Switch>
          {/* 所有/admin路径转发给App.js*/}
          <Route path="/admin" render={ routeProps => <App {...routeProps} />}></Route>
          {/* 主要路由直接匹配 */}
          { mainRoutes.map((route)=>{
            // return <Route key={route.path} component={route.component}></Route>
            return <Route key={route.path} {...route}></Route>
          }) }
          {/* 如果上面遍历中没有找到路由则会执行当前重定向路由404 */}
          <Redirect to="/admin" from="/" />
          <Redirect to="/404" />
        </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
