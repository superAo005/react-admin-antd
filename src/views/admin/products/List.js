import React from 'react'
import { Trans } from 'react-i18next'
import { Card, Table, Button, Popconfirm } from 'antd'

const columns = [
    {
        title:'序号',
        key: 'id',
        width: 80,
        align: 'center',
        render: (txt, record, index) =>{
            return index + 1
        }
    },
    {
        title:'商品名称',
        dataIndex: 'name'
    },
    {
        title:'价格',
        dataIndex: 'price'
    },
    {
        title:'操作',
        render: (txt, record, index) =>{
            return (
                <div>
                    <Button type="primary" size="small">修改</Button>
                    <Popconfirm title="请确认是否删除?" onCancel={()=>{ console.log("用户取消删除") }} onConfirm={()=>{ console.log('用户确认删除') }}>
                        <Button type="danger" size="small" style={{margin: '1rem'}}>删除</Button>
                    </Popconfirm>
                </div>
            )
        }
    },
]

const dataSource = [
    {
        id: 1,
        name: '特仑苏',
        price: 78.5,
        key: 1
    },
    {
        id: 2,
        name: '红富士',
        price: 60.5,
        key: 2
    },
    {
        id: 3,
        name: '中华',
        price: 50,
        key: 3
    }
]

class List extends React.Component{
    
    render(){
        return (
            <Card title={<Trans>列表</Trans>} extra={<Button type="primary" size="small">新增</Button>}>
                <Table columns={columns} bordered dataSource={dataSource}></Table>
            </Card>
        )
    }
}

export default List