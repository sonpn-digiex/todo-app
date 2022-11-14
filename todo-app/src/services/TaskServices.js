// @author Pham Ngoc Son
// @supporter: 
// @created date: 08/11/2022
// @reviewer:
//@description: Create all API request for task

import Request from "../fetch/request";

const TaskServices = {
  GetTaskList: async () => {
    return await Request.Get("/tasks");
  },
  CreateTask: async (task) => {
    return await Request.Post("/tasks", task);
  },
  RemoveTask: async (id) => {
    return await Request.Delete(`/task/${id}`);
  },
  UpdateTask: async (id, data) => {
    return await Request.Put(`/tasks/${id}`, data);
  },
  GetTask: async (id) => {
    return await Request.Get(`/tasks/${id}`);
  }
};

export default TaskServices;
