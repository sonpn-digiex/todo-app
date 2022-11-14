import { TiDeleteOutline } from "react-icons/ti";
import { BiEdit } from "react-icons/bi";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import { changeTaskList, deleteTask } from "../services/TaskService";
import { TASK_STATUS } from "constants/task-status";

export default function TaskItem({ content, status, id, forceRender }) {
  const isCompleted = status === TASK_STATUS.COMPLETE ? true : false;

  const navigate = useNavigate();

  const onHandleChangeStatus = () => {
    changeTaskList(id, {
      id,
      value: content,
      status: isCompleted ? TASK_STATUS.UNCOMPLETED : TASK_STATUS.COMPLETE,
    });

    forceRender((render) => !render);
  };

  const onHandleDeleteTask = () => {
    deleteTask(id);
    forceRender((render) => !render);
    toast.success("Delete successfully");
  };

  const onHandleEditTask = () => {
    navigate(`/task/${id}`);
  };

  return (
    <div className="flex justify-between items-center bg-[#6600FF] my-4 p-7 rounded transition-all">
      <p
        className={`flex-1 cursor-pointer ${isCompleted ? "line-through" : ""}`}
        onClick={onHandleChangeStatus}>
        {content ?? ""}
      </p>
      <div className="flex">
        <div className="cursor-pointer" onClick={onHandleDeleteTask}>
          <TiDeleteOutline size={"24px"} />
        </div>
        <div className="cursor-pointer ml-1" onClick={onHandleEditTask}>
          <BiEdit size={"24px"} />
        </div>
      </div>
    </div>
  );
}
