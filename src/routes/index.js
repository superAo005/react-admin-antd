
// 登录
import Login from "@/views/Login"

// 404
import notFound from "@/views/error/notFound"
import Home from "@/views/admin"

// 看板
import Dashboard from "@/views/admin/dashboard"

// 商品管理
import Product from "@/views/admin/products"
import List from "@/views/admin/products/List"
import Edit from "@/views/admin/products/Edit"

// 组件
import Assembly from "@/views/admin/assembly"
import From from "@/views/admin/assembly/From"
import Button from "@/views/admin/assembly/Button"

// 测试页面
import Test from "@/views/admin/test"



// 主要路由
export const mainRoutes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/404',
        component: notFound
    }
]

// 菜单路由
export const adminRoutes = [
    {
        path: '/admin',
        component: Home,
        hideClose:true, // 标签页是否隐藏关闭图标
        exact: true,
        isShow: true,
        title: '首页',
        icon: "icon-icon-shouye"
    },
    {
        path: '/admin/dashboard',
        component: Dashboard,
        exact: true,
        isShow: true,
        title: '仪表盘',
        icon: "icon-yibiao"
    },
    {
        path: '/admin/products', // 路由
        component: Product, // 组件
        exact: true, // 是否严格模式
        isShow: true, // 是否显示
        title: '商品管理', // 左侧菜单栏和面包签名称
        icon: "icon-xiazai", // 图标
        route:true, // 面包签中不能进行点击则加上route
        childrens:[ // 嵌套路由
            {
                path: '/admin/products/edit/:id',
                component: Edit,
                isShow: false
            },
            {
                path: '/admin/products/list',
                component: List,
                exact: true,
                isShow: true,
                title: '列表',
                icon: "icon-shangpinliebiao1"
            }
        ]
    },
    {
        path: '/admin/assembly', 
        component: Assembly, 
        exact: true,
        isShow: true, 
        title: '组件',
        icon: "icon-sub-unit",
        route:true,
        childrens:[
            {
                path: '/admin/assembly/from',
                component: From,
                exact: true,
                isShow: true,
                title: '表单',
                icon: "icon-biaodan"
            },
            {
                path: '/admin/assembly/button',
                component: Button,
                exact: true,
                isShow: true,
                title: '按钮',
                icon: "icon-anniu2"
            }
        ]
    },
    {
        path: '/admin/test',
        component: Test,
        exact: true,
        isShow: true,
        title: 'redux测试',
        icon: "icon-yibiao"
    },
]