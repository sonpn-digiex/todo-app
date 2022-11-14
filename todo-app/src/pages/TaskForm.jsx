import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { TASK_STATUS } from "../constants/task-status";
import TaskServices from "../services/TaskServices";

const initTask = {
  id: 0,
  value: "",
  status: TASK_STATUS.UNCOMPLETED,
};
const TaskForm = () => {
  const navigate = useNavigate();

  let { id } = useParams();

  const [task, setTask] = useState(initTask);
  const [loading, setLoading] = useState(false);
  const [isValidTask, setIsValidTask] = useState(true);

  const handleInput = (value) => {
    if (value !== undefined) {
      setTask({ ...task, value: value });
      if (value.length > 100) {
        setIsValidTask(false);
      } else if (!isValidTask) {
        setIsValidTask(!isValidTask);
      }
    }
  };

  const onChange = (e) => {
    setTask({ ...task, status: e.target.value });
  };

  const handleGetTask = (id) => {
    TaskServices.GetTask(id)
      .then((result) => {
        setTask(result.data);
      })
      .catch((error) => {
        console.error(error);
        setTask(initTask);
        navigate("/task");
      });
  };

  useEffect(() => {
    if (id !== 0 && id !== undefined) {
      handleGetTask(id);
    } else {
      setTask(initTask);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSaveTask = () => {
    setLoading(true);
    if (!task || task.value === "" || task.value === null || task.value.length > 100) {
      toast.error("Invalid task detail");
      setLoading(false);
      return;
    }

    if (!id) {
      TaskServices.CreateTask(task)
        .then((result) => {
          toast.success("Task created successfully");
          setLoading(false);
          setTask(initTask);
        })
        .catch((err) => {
          console.log("TaskServices.CreateTask -> err", err);
          setLoading(false);
        });
    } else {
      TaskServices.UpdateTask(id, task)
        .then((result) => {
          setLoading(false);
          toast.success("Updated successfully!");
          navigate("/", { replace: true });
        })
        .catch((err) => {
          toast.error("Error updating!");
        });
    }
  };
  return (
    <div className="flex flex-row justify-center bg-blue-900 ">
      <div className="w-8/12 h-screen mt-8 bg-[#000044] rounded-xl  ">
        <div className="flex flex-row justify-center mt-10">
          <h1 className="text-zinc-50 font-bold text-3xl">What's the Plan for Today?</h1>
        </div>
        <Link to="/" className="text-white text-xs p-5 flex flex-row justify-center underline">
          {" "}
          home{" "}
        </Link>
        <div className="flex flex-row justify-center mt-8 p-5">
          <input
            className="text-zinc-50 h1 px-3 placeholder-gray-100 bg-[#000044] border-violet-800
             rounded-l-lg border-2 leading-9 w-80 outline-none "
            value={task.value}
            onChange={(e) => handleInput(e?.target?.value)}
          />
          <button
            className="bg-violet-800 border-violet-800 border-2 px-3 rounded-r-lg text-white"
            onClick={handleSaveTask}>
            {!!id ? (loading ? "Updating" : "Update") : loading ? " Adding" : "Add Task"}
          </button>
        </div>
        {isValidTask ? "" : <p className="text-rose-500 text-center">maximum 100 character</p>}
        {!!task && !!task.id ? (
          <div className="flex flex-row justify-center mt-8">
            <select
              className="bg-violet-800 border border-gray-300 text-zinc-50 text-sm rounded-lg focus:ring-blue-500
                     focus:border-white  w-96  p-2.5 dark:bg-violet-800 dark:placeholder-gray-400
                     block"
              value={task.status}
              onChange={onChange}>
              <option id="1" value={TASK_STATUS.UNCOMPLETED}>
                Uncompleted
              </option>
              <option id="2" value={TASK_STATUS.completed}>
                Completed
              </option>
            </select>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default TaskForm;
