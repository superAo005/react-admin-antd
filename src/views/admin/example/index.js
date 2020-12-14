import React, { useState, useEffect, createContext, useContext, useReducer, useMemo, useRef } from 'react'
import { Button, Card, Input } from 'antd'
import { Trans } from 'react-i18next'

const CountContext = createContext()

function Counter(){
    let count = useContext(CountContext)
    return (
        <div>
            <h2>{count}</h2>
        </div>
    )
}

// 当父组件值改变时，子组件会重新渲染所有方法和值，这里使用useMemo，指定方法渲染，这样能够提升页面渲染性能
function ChildCompoent({name,children}){
    let changeName = (name)=>{
        console.log('张三小姐')
        return name
    }
    // 这里表示只有name参数改变时才会执行当前方法
    let zhangsan = useMemo(()=>changeName(name),[name])

    let changeChildren = (children)=>{
        console.log('李四小姐')
        return children
    }
    // 这里表示只有children参数改变时才会执行当前方法
    let lisi = useMemo(()=>changeChildren(children),[children])
    return (
        <div>

            <h2>{zhangsan}</h2>
            <h2>{lisi}</h2>
        </div>
    )
}

function Index() {
    const [count, setCount] = useState(0)
    const [ age , setAge ] = useState(18)
    const [ sex , setSex ] = useState('男')
    const [ work , setWork ] = useState('前端程序员')

    // 第一次组件渲染完成后或组件更新完成后执行,异步函数
    useEffect(()=>{
        console.log("进入了hooks测试组件执行了")
        return ()=>{
            console.log("离开了hooks测试组件")
        }
    },[])
    // count改变时才执行return匿名函数，为空表示组件销毁时才执行
    // useEffect(()=>{
    //     console.log("进入了hooks测试组件执行了,count:"+count)
    //     return ()=>{
    //         console.log("count被改变了:count:"+count)
    //     }
    // },[count])

    // 声明一个变量color = blue, 一个函数dispatch('red') 实现颜色改变
    const [color, dispatch] = useReducer((state,action)=>{
        switch(action){
            case 'red':
                return 'red'
            case 'green':
                return 'green'
            default:
                return state

        }
    },'blue')


    const [ zhangsan , setZhangsan ] = useState('张三')
    const [ lisi , setLisi ] = useState('李四')

    const inputEl = useRef(null)

    let InputValue = ()=>{
        inputEl.current.value = 'www.antd-admin.cn'
    }

    return (
        <div style={
            {
                padding: '50px',
                display: 'flex',
                width: '100%',
                justifyContent:'space-evenly'
            }
        }>
            <Card title={<Trans>数字加减</Trans>}>
                <p>You clicked <span style={{color: 'red',fontSize: '20px'}}>{ count }</span> times</p>
                <Button style={{ color: 'green' }}
                    onClick={()=>{ setCount(count+1) }}
                >加一</Button>
                <Button style={{ color: 'blue' }}
                    onClick={()=>{ setCount(count-1) }}
                >减一</Button>
            </Card>
            <Card title={<Trans>多状态声明</Trans>}>
                <p>年龄: {age}岁</p>
                <p>性别: {sex}</p>
                <p>工作是: {work}</p>
            </Card>
            <Card title={<Trans>父子组件传值</Trans>}>
                <CountContext.Provider value={count}>
                        <Counter></Counter>
                </CountContext.Provider>
            </Card>
            <Card title={<Trans>useReducer用法</Trans>}>
                <h2 style={{ color : color }}>字体颜色是{color}</h2>
                <Button style={{ color: 'red' }}
                    onClick={()=>{ dispatch('red') }}
                >红色</Button>
                <Button style={{ color: 'green' }}
                    onClick={()=>{ dispatch('green') }}
                >绿色</Button>
            </Card>
            <Card title={<Trans>子组件重复执行</Trans>}>
                <Button
                    onClick={()=>{ setZhangsan(zhangsan+'小姐') }}
                >张三</Button>
                <Button
                    onClick={()=>{ setLisi(lisi+'小姐') }}
                >李四</Button>
                <ChildCompoent name={zhangsan}>
                    {lisi}
                </ChildCompoent>
            </Card>
            <Card title={<Trans>useRef使用</Trans>}>
                <input ref={inputEl} />
                <Button danger 
                    onClick={()=>{InputValue()}}
                >给input赋值</Button>
            </Card>
        </div>
    )
}

export default Index
