import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { adminRoutes } from '@/routes'
import '@/utils/i18n'
import './App.css'
import Frame from '@/components/Frame'
import Auth from '@/utils/auth'


class App extends React.Component {
  // 递归处理路由
  generateRoute(item){
    // 有子路由
    if(item.childrens && item.childrens.length !== 0){
      // 当前路由也要生成路由
      let routeView = <Route key={item.path} 
                             path={item.path}
                             exact={item.exact}
                             render={
                               routeProps=>{
                                 return <item.component {...routeProps} />
                               }
                             }></Route>
      // 生成当前路由的子路由
      let childrens = item.childrens.map((route)=>{
        return this.generateRoute(route)
      })
      childrens.push(routeView)
      return childrens
    }

    // 生成当前路由
    return <Route key={item.path} 
                  path={item.path}
                  exact={item.exact}
                  render={
                    routeProps=>{
                      return <item.component {...routeProps} />
                    }
                  }></Route>
  }

  render(){
    return Auth.isLogin() ? (
      <Frame>
        <Switch>
          {
              adminRoutes.map(item=>{
                return this.generateRoute(item)
              })
          }
          {/* 如果路由访问的地址是/admin则进入第一个路由 */}
          {/* <Redirect to={adminRoutes[0].path} from="/admin"/> */}
          {/* 如果上面遍历中没有找到路由则会执行当前重定向路由404 */}
          <Redirect to="/404"></Redirect>
          {/* <Route key='/*' path='/*' component={notFound}></Route> */}
        </Switch>
      </Frame>
      
    ) : <Redirect to="/login"></Redirect>
  }
}

export default App
