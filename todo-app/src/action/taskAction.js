import { getTaskList } from "services/TaskService";

export const getTaskListAction = (callback) => {
  getTaskList().then((res) => {
      callback(res.data);
    }).catch((err) => {
      console.log("getTaskListAction->err", err);
    });
};
