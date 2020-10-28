import React, { Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Menu, Layout, Avatar, Breadcrumb, Switch, Dropdown } from 'antd'
import logo from './logo192.png'
import { adminRoutes as routes } from '../../routes'
import { MenuUnfoldOutlined, MenuFoldOutlined, createFromIconfontCN, BulbOutlined } from '@ant-design/icons';
import './index.css'  
import { Trans, withTranslation } from 'react-i18next'
import Auth from '../../utils/auth'
import { notification } from 'antd'
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

// 阿里矢量图标地址
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2157315_zfizvyxc36.js',
})

//具体导航的名称
const breadcrumbNameMap = {}

const languages = [
    {
        key: 'zh',
        title: '简体中文',
        icon: 'icon-zhongwen'
    },
    {
        key: 'en',
        title: 'English',
        icon: 'icon-yingwen'
    }
]

@withTranslation()
@withRouter
class Index extends React.Component{
    state = {
        collapsed: false,
        pathSnippets: null,
        extraBreadcrumbItems: null,
        state: null,
        theme: 'dark',
        username: JSON.parse(localStorage.getItem('loginInfo')).username
    }
    
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        })
    }

    handleLanguageChange = ({key})=>{
        this.props.i18n.changeLanguage(key)
    }

    // 获取当前语言类型
    getLanguageTitle = () =>{
        for(let index in languages){
            if(languages[index].key === this.props.i18n.language){
                return languages[index]
            }
        }
    }

    // 加载面包屑数据
    loadBreadcrumb(route){
        route.forEach((item)=>{
            if(item.isShow){
                breadcrumbNameMap[item.path] = {
                    title: item.title,
                    icon: item.icon,
                    route: item.route ? item.route : false
                }
            }
            if(item.childrens){
                this.loadBreadcrumb(item.childrens)
            }
        })
    }

    // 获取面包屑
    getPath = () => {
        //对路径进行切分，存放到this.state.pathSnippets中
        this.state.pathSnippets = this.props.location.pathname.split('/').filter(i => i)
        //将切分的路径读出来，形成面包屑，存放到this.state.extraBreadcrumbItems
        this.state.extraBreadcrumbItems = this.state.pathSnippets.map((item,index) => {
            let url = `/${this.state.pathSnippets.slice(0, index + 1).join('/')}`
            if(breadcrumbNameMap[url]){
                return (
                    <Breadcrumb.Item key={url}>
                        <Link to={breadcrumbNameMap[url].route ? '#' : url}>
                            <IconFont type={breadcrumbNameMap[url].icon} />
                            <Trans>{breadcrumbNameMap[url].title}</Trans>
                        </Link>
                    </Breadcrumb.Item>
                )
            }
        })
    }

    // 递归处理路由
    renderMenu=(data)=>{
        return data.map((item)=>{
            if (item.childrens) {  //如果有子节点，继续递归调用，直到没有子节点
                if(!(item.childrens.length === 1 && !item.childrens[0].isShow)){
                    return (
                        <SubMenu title={<Trans>{item.title}</Trans>} key={item.path} icon={ <IconFont type={item.icon} /> }>
                            {this.renderMenu(item.childrens)}
                        </SubMenu>
                    )
                }
            }
            if(item.isShow){
                //没有子节点就返回当前的父节点
                return <Menu.Item title={<Trans>{item.title}</Trans>} key={item.path} icon={ <IconFont type={item.icon} /> } onClick={ p => this.toRouteView(p.key) }>
                    <Trans>{item.title}</Trans>
                </Menu.Item>
            }
        })
    }

    // 路由跳转到页面
    toRouteView = (key) => {
        this.props.history.push(key)
    }

    render(){
        this.loadBreadcrumb(routes)
        this.getPath()

        return (
            <Layout>
                {/* 左边区域 */}
                <Sider trigger={null} collapsible collapsed={this.state.collapsed} theme={this.state.theme}>
                    {/* logo图片 */}
                    <div className={this.state.theme === 'dark' ? 'logo' : 'logo-light'}>
                        <img src={logo} alt="logo"></img>
                        {!this.state.collapsed && <h1><Trans>后台管理系统</Trans></h1>}
                    </div>

                    <Menu className="menuContainer" mode="inline" theme={this.state.theme}>
                        {/* 左侧菜单栏 */}
                        {this.renderMenu(routes)}
                    </Menu>

                    {!this.state.collapsed && (
                        <div className="switchTheme">
                            <span>
                                <BulbOutlined /><Trans>切换主题</Trans>
                            </span>
                            <Switch 
                                checkedChildren={<Trans>暗</Trans>} 
                                unCheckedChildren={<Trans>明</Trans>}
                                defaultChecked={this.state.theme === 'dark' ? true : false}
                                onChange={checked=>{
                                    this.setState({
                                        theme: checked ? 'dark' : 'light'
                                    })
                                }}
                            />
                        </div>
                    )}
                </Sider>
                {/* 右边区域 */}
                <Layout className="site-layout">
                    {/* 头部 */}
                    <Header className="site-layout-background" theme='light' style={{ padding: 0 }}>   
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                        })}
                        <Menu theme='light' mode="horizontal" style={{ height: '64px' }}>
                            <Menu.Item key="1"><Trans>菜单一</Trans></Menu.Item>
                            <Menu.Item key="2"><Trans>菜单二</Trans></Menu.Item>
                            <Menu.Item key="3"><Trans>菜单三</Trans></Menu.Item>
                            
                            {/* 头像和登录名称 */}
                            <SubMenu style={{ float: 'right' }}
                                title={
                                    <Fragment>
                                        <Avatar style={{ marginLeft: 8 }} src={logo} />
                                        <span style={{ color: '#999', marginRight: 4, marginLeft:5 }}>
                                            <Trans>你好</Trans>,
                                        </span>
                                        <span>{this.state.username}</span>
                                    </Fragment>
                                }
                            >
                                <Menu.Item key="SignOut" onClick={()=>{
                                    Auth.logOut()
                                    this.props.history.push('/login')
                                }}>
                                    <Trans>退出登录</Trans>
                                </Menu.Item>
                            </SubMenu>
                            {/* 语言切换 */}
                            <Dropdown overlay={
                                <Menu onClick={this.handleLanguageChange}>
                                    {
                                        languages.map(item=>{
                                           return <Menu.Item key={item.key}>
                                                <IconFont type={item.icon} />
                                                {item.title}
                                            </Menu.Item>
                                        })
                                    }
                                </Menu>
                            }>
                                <a className="ant-dropdown-link" style={{ float: 'right' }}>
                                    <IconFont type={this.getLanguageTitle().icon} />
                                    {this.getLanguageTitle().title}
                                </a>
                            </Dropdown>
                        </Menu>
                    </Header>
                    {/* 面包屑 */}
                    <Breadcrumb style={{ margin: '12px 0',padding: '0 24px' }}>
                        {this.state.extraBreadcrumbItems}
                    </Breadcrumb>
                    {/* 内容区域 */}
                    <Content
                        style={{
                            backgroundColor:'#FFF',
                            margin: '0 16px',
                            minHeight: 280,
                        }}
                    >
                        {this.props.children}
                    </Content>
                    {/* 底部 */}
                    <Footer style={{ textAlign: 'center' }}><Trans>睿颐软件科技有限公司</Trans> ©2020 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default Index
