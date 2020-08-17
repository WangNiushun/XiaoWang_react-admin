import React, { Component } from 'react'
import { Button, Table, Tooltip } from 'antd'
import { PlusOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
// 引入的是 创建 action对象的函数
import { getSubjectList,getSecSubjectList } from './redux'

// 引入使用antd 组件 的样式
import './index.less'

const columns = [
  /**
   * title: 表示这一列的标题
   * dataIndex: 表示这一列中要展示data数据的中哪一项值
   * key: 唯一id
   */
  // { title: '分类名称', dataIndex: 'name', key: 'name' },
  // 注意: 后台返回的数据,课程分类名称的属性是title.不是name.所以记得改一下
  { title: '分类名称', dataIndex: 'title', key: 'name' },

  {
    title: '操作',
    // 注意: 如果这一列不展示data中的数据,那么就可以不写dataIndex,或者是值为空的字符串
    // dataIndex: 'age',
    key: 'x',
    render: () => (
      <>
        <Tooltip title='更新课程'>
          <Button
            type='primary'
            icon={<FormOutlined />}
            style={{ marginRight: 20, width: 40 }}
          // size='large'
          // style={{ width: 40 }}
          ></Button>
        </Tooltip>
        <Tooltip title='删除课程'>
          <Button
            type='danger'
            icon={<DeleteOutlined />}
            // size='large'
            style={{ width: 40 }}
          ></Button>
        </Tooltip>
      </>
    ),
    width: 200
  }
]

// const data = [
//   {
//     key: 1,
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     description:
//       'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
//   },
//   {
//     key: 2,
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//     description:
//       'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.'
//   },
//   {
//     key: 3,
//     name: 'Not Expandable',
//     age: 29,
//     address: 'Jiangsu No. 1 Lake Park',
//     description: 'This not expandable'
//   },
//   {
//     key: 4,
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sidney No. 1 Lake Park',
//     description:
//       'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.'
//   }
// ]

// 使用高阶租界时,如果使用修饰器语法:传入展示组件的调用可以不行了,写一个小括号就可以了
@connect(state => ({ subjectList: state.subjectList }), { getSubjectList,getSecSubjectList })

class Subject extends Component {

  // constructor(){
  //   super()
  //   this.page = 1
  // }
  // 上面可以简写为,这是为了解决点击到第二页,切换当前页面数据条数变化时,出现得bug
  //  bug:页码和显示页面显示的数据无法对应
  page = 1



  // 组件挂载的时候,去调用异步action
  componentDidMount() {
    this.props.getSubjectList(1, 10)
  }

  // 页码变化时的回调函数
  handleChange = (page, limit) => {
    console.log('页码发生变化')
    // 将当前页码得值 赋值为当前组件实例得page属性
    this.page = page
    this.props.getSubjectList(page, limit)
  }

  // 一页展示的数据条数变化的时候触发的函数
  handleShowSizeChange = (page, pageSize) => {
    console.log('每页展示的条数改变时')
    this.props.getSubjectList(page, pageSize)
  }

  // 点击可展开按钮的事件处理函数
  handleExpand =(expanded, record)=>{
    // 不知道这两个参数是什么，就打印看一下
    // 第一个:是布尔值,为true,代表展开;  第二个参数:是一个对象,代表你当前点击得是哪一个按钮
    console.log(expanded,record)
    if(expanded){
      // 发送二级请求,获取二级菜单数据
      // 注意: 一级菜单的 _id 就是二级课程的parentId
      this.props.getSecSubjectList(record._id)
    }
  }

  render() {
    // console.log(this.props)
    return (
      <div className='subject'>
        <Button type='primary' icon={<PlusOutlined />} className='subject-btn'>
          新建
        </Button>

        <Table
          columns={columns}
          expandable={{
            // // 控制展开的行的内容
            // expandedRowRender: record => (
            //   <p style={{ margin: 0 }}>{record.description}</p>
            // ),
            // // 控制对应这一行是否有展开按钮,true就是有,false 就是没有
            // rowExpandable: record => record.name !== 'Not Expandable'
            onExpand: this.handleExpand
            
          }}
          // 注意: table组件,在渲染数据的时候,默认使dataSource数据中的key属性的值作为底层列表渲染key的值.
          //  但是我们后台返回的数据没有key属性. table组件支持,我们通过rowkey指定使用我们自己数据中某个属性作为key的值
          dataSource={this.props.subjectList.items}
          rowKey='_id'
          pagination={{
            // 表示总共有多少条数据, pagination,底层默认一页是10条数据,所以数据是30条,就分3页
            total: this.props.subjectList.total,
            // 默认分页器每页是多少条
            defaultPageSize: 10,
            // 是否展示一页展示几条数据的修改项
            showSizeChanger: true,
            // 控制一页展示几条的选项
            pageSizeOptions: ['5', '10', '15'],
            // 展示快速跳转到那一页
            showQuickJumper: true,

            // 是页码变化的时候会触发的回调函数
            onChange: this.handleChange,
            // 一页展示的数据条数变化的时候触发的函数
            onShowSizeChange: this.handleShowSizeChange,

            current:this.page
          }}
        />
      </div>
    )
  }
}

export default Subject