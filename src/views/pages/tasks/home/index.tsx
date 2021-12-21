import { FC, useState, useEffect } from "react";

import TaskHomeHeader from "./components/TaskHomeHeader";
import ListTable from "./components/ListTable";
import ClassifyTable from "./components/ClassifyTable";

const TaskHomePage: FC = () => {
  const [viewMode, setViewMode] = useState("LIST");

  useEffect(() => {
    document.title = "Quản lí công việc";
  }, []);

  return (
    <>
      <div>
        <TaskHomeHeader viewMode={viewMode} onChangeMode={setViewMode} />
      </div>

      <div className="task-management-content overflow-auto">
        {/* Table */}
        <div className={" flex flex-col w-full"}>
          {viewMode === "LIST" && <ListTable />}
          {viewMode === "PROJECT" && <ClassifyTable />}
        </div>
      </div>
    </>
  );
};

export default TaskHomePage;
