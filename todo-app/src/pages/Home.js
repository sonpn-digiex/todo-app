import { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

import { getTaskListAction } from "action/taskAction";

import TaskItem from "components/TaskItem";

function Home() {
  const [taskList, setTaskList] = useState([]);
  const [reRender, setReRender] = useState(true);

  useEffect(() => {
    getTaskListAction(setTaskList);
  }, [reRender]);

  const renderTaskList = () => {
    return taskList?.map((taskItem) => (
      <TaskItem
        key={taskItem.id}
        id={taskItem.id}
        status={taskItem.status}
        content={taskItem.value}
        forceRender={setReRender}
      />
    ));
  };

  return (
    <div className="flex items-center justify-center bg-blue-900 min-h-[100vh]">
      <div className="mt-10 pt-10 min-h-[400px] w-8/12 h-max py-3 px-5 bg-[#000044] rounded-md">
        <h1 className="text-zinc-50 font-bold text-3xl text-center">What's the Plan for Today?</h1>
        <Link to="/task" className="text-white text-xs p-5 flex flex-row justify-center underline">
          <AiOutlinePlusCircle size={"80px"} />
        </Link>
        {taskList.length === 0 && (
          <p className="text-white text-center text-lg">There is no mission, create one</p>
        )}
        <div className="my-[45px] text-white overflow-auto">{renderTaskList()}</div>
      </div>
    </div>
  );
}
export default Home;
