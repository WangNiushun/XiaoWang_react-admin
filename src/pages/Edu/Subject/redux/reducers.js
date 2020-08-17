import { GET_SUBJECT_LIST, GET_SECSUBJECT_LIST } from "./constants";

const initUserList = {
  total: 0, // 总数
  items: [], // subject的消息数据
};

export default function subjectList(prevState = initUserList, action) {
  switch (action.type) {
    case GET_SUBJECT_LIST:
      //#region 
      // action.data
      /**
       * {
       *  total: 0,
       *  items: [{
       *     _id: xxx,
       *     title: yyy,
       *     parentId: 0
       *     children:[]  如果数据中有children属性,并且值是数组.那么table组件就会自动给每一行添加一个可展开按钮
       *  }]
       * }
       */
      // console.log(action.data)
      //#endregion
      // 为了实现二级分类课表,必须给每一项添加一个属性 children
      action.data.items.forEach(item => { item.children = [] });
      return action.data;

    case GET_SECSUBJECT_LIST:
      // 修改数据,添加到redux中
      // action.data可以获取到对应的一级课程分类的所有二级课程分类
      console.log(action.data)
      // action.data返回的是对象. total和items. items使我们要用的二级课程数据
      const SecItems = action.data.items
      // 二级课程分类数据,应该添加到对应得一级课程的children属性里面
      // prevState.items 是所有一级课程分类数据
      // item[0].parentId 是对应得一级课程分类的id 
      const FisItems = prevState.items
      // 遍历所有得一级课程分类,前提是二级分类的是数据至少有一个,不然会报错
      if (SecItems.length) {
        FisItems.forEach(item => {
          if (item._id === SecItems[0].parentId) {
            // 找到指定得一级课程分类
            item.children = SecItems
          }
        })
      }

      return {
        ...prevState,
        items: FisItems
      }
    default:
      return prevState;
  }
}


