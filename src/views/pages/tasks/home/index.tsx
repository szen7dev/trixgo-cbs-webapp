import { FC } from "react";

import TaskHomeHeader from "./components/TaskHomeHeader";
import ListTable from "./components/ListTable";
import ClassifyTable from "./components/ClassifyTable";

const TaskHomePage: FC = () => {
  return (
    <>
      <div>
        <TaskHomeHeader />
      </div>
      {/* Table */}
      <div className="task-management-content overflow-auto">
        {/* Table Header */}
        <div className={" flex flex-col w-full"}>
          <ClassifyTable />
        </div>
      </div>
    </>
  );
};

export default TaskHomePage;
