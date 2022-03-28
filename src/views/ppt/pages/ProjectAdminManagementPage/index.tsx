import React, { FC, useState } from "react";
import {  useParams, useHistory } from 'react-router-dom';
import { DepartmentRepository } from 'apis/item';

import AppAdminTab from "./tabs/AppAdminTab";
import { useAuth } from "services/hooks/auth/useAuth";
import { toast } from "react-toastify";

const ProjectAdminManagementPage: FC = (): any => {
  const [toggleTab, setToggleTab] = useState(1);
  const handleToggleTab = (index: number) => setToggleTab(index);
	const { id: projectID } = useParams<{ id: string }>();
  const { user } = useAuth();
  const history = useHistory();

  // Call trực tiếp api
	React.useEffect(() => {
		if (projectID) {
        (async () =>  {
          const infoDepartment = await DepartmentRepository.fetchDetailDepartment({ departmentID: projectID });
          if(!infoDepartment?.data?.admins?.includes(user?._id || "")){
            toast.error("Bạn không có quyền truy cập");
            return history.push("/");
          }
        })();
		}
	}, [projectID]);
  
  return (
    <main className="h-full">
      <header className="sticky flex justify-between items-center top-0 bg-primary-light z-10 h-10 px-6 border-b border-gray-300">
        <div className="h-full">
          <button
            className={
              toggleTab === 1
                ? "w-auto h-full p-2 font-bold text-sm border-b-2 border-primary"
                : "w-auto h-full p-2 text-sm text-primary-gray"
            }
            onClick={() => handleToggleTab(1)}
          >
            Thành viên
          </button>
          <button
            className={
              toggleTab === 2
                ? "w-auto h-full p-2 font-bold text-sm border-b-2 border-primary"
                : "w-auto h-full p-2 text-sm text-primary-gray"
            }
            onClick={() => handleToggleTab(2)}
          >
            Nhóm dữ liệu
          </button>
          <button
            className={
              toggleTab === 3
                ? "w-auto h-full p-2 font-bold text-sm border-b-2 border-primary"
                : "w-auto h-full p-2 text-sm text-primary-gray"
            }
            onClick={() => handleToggleTab(3)}
          >
            Gói thầu
          </button>
        </div>
      </header>

      <AppAdminTab toggleTab={toggleTab} />
    </main>
  );
};

export default ProjectAdminManagementPage;