import React from 'react'
import { Form, Input, Button, Checkbox, Card } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import Auth from '../utils/auth'
import './login.css'

class Login extends React.Component{

    state = {
        username:null,
        password:null,
        isRemeber:false
    }

    // 渲染用户
    isRemeber = () => {
        let userinfo = Auth.getUserPwd()
        if(userinfo && userinfo.remember){
            this.state.username = userinfo.username
            this.state.password = userinfo.password
            this.state.isRemeber = 'checked'
        }
    }

    onFinish = values => {
        // console.log('Received values of form: ', values)
        // 登录成功，设置token令牌
        Auth.setToken('shaiudhsakjsaidhsakjndsjkahdakjldsa')
        // 是否点击记住我，如果点击则保存用户账号和密码
        Auth.setUserPwd(values)

        this.props.history.push('/admin') // 成功后跳转
    }

    render(){
        this.isRemeber()
        return (
            <Card title="后台管理系统" className="login-form">
                <Form
                name="normal_login"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: '请输入用户名!' }]}
                    initialValue={this.state.username}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请输入密码!' }]}
                    initialValue={this.state.password}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName={this.state.isRemeber} noStyle>
                        <Checkbox>记住我</Checkbox>
                    </Form.Item>
            
                    <a className="login-form-forgot" href="">
                        忘记密码？
                    </a>
                </Form.Item>
            
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                    登 录
                    </Button>
                    或者 <a href="">注册账号!</a>
                </Form.Item>
                </Form>
            </Card>
          )
    }
}

export default Login
