
// 登录
import Login from "../views/Login"

// 404
import notFound from "../views/error/notFound"

// 看板
import Dashboard from "../views/admin/dashboard"

// 商品管理
import Product from "../views/admin/products"
import List from "../views/admin/products/List"
import Edit from "../views/admin/products/Edit"

// 组件
import Assembly from "../views/admin/assembly"
import From from "../views/admin/assembly/From"
import Button from "../views/admin/assembly/Button"
import { func } from "prop-types"



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
        path: '/admin/dashboard',
        component: Dashboard,
        exact: true,
        isShow: true,
        title: '仪表盘',
        icon: "icon-kanban"
    },
    {
        path: '/admin/products', // 路由
        component: Product, // 组件
        exact: true, // 是否严格模式
        isShow: true, // 是否显示
        title: '商品管理', // 左侧菜单栏和面包签名称
        icon: "icon-shangpin", // 图标
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
                title: '商品列表',
                icon: "icon-shangpinliebiao"
            }
        ]
    },
    {
        path: '/admin/assembly', 
        component: Assembly, 
        exact: true,
        isShow: true, 
        title: '组件',
        icon: "icon-zujian1",
        route:true,
        childrens:[
            {
                path: '/admin/assembly/from',
                component: From,
                exact: true,
                isShow: true,
                title: '表单',
                icon: "icon-cloud-form"
            },
            {
                path: '/admin/assembly/button',
                component: Button,
                exact: true,
                isShow: true,
                title: '按钮',
                icon: "icon-anniu"
            }
        ]
    }
]