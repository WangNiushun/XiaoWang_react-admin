import { reqGetSubject,reqGetSecSubject } from "@api/edu/subject";

// 上面引入了一些异步请求的接口函数

import { GET_SUBJECT_LIST,GET_SECSUBJECT_LIST } from "./constants";
// 引入常量




// 获取一级课程分类
// 配合异步action的 同步的action,不用暴漏,只在异步 action 中使用
const getSubjectListSync = (list) => ({
  type: GET_SUBJECT_LIST,
  data: list,
});


export const getSubjectList = (page,limit) => {
  return (dispatch) => {
    return reqGetSubject(page,limit).then((response) => {
      dispatch(getSubjectListSync(response));
      return response;
    });
  };
};

//#region 
// 下面是自己 使用 async 和 await 函数写得
// export const getSubjectList = (page,limit) => {
//   return async(dispatch) => {
//     const res = await reqGetSubject(page,limit)
//     // console.log(res)
//     dispatch(getSubjectListSync(res));
//   };
// };
//#endregion

// 获取二级课程列表
const getSecSubjectListSync = list =>{
  return {
    type:GET_SECSUBJECT_LIST,
    data:list
  }
}

export const getSecSubjectList = parentId => {
  return dispatch => {
    return reqGetSecSubject(parentId).then((response) => {
      dispatch(getSecSubjectListSync(response));
      return response;
    });
  };
};



