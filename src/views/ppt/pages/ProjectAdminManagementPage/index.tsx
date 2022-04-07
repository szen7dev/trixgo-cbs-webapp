import { FC, useState, useEffect } from "react";
import {  useParams, useHistory } from 'react-router-dom';
import { DepartmentRepository } from 'apis/item';

import AppAdminTab from "./tabs/AppAdminTab";
import { useAuth } from "services/hooks/auth/useAuth";
import { toast } from "react-toastify";

const ProjectAdminManagementPage: FC = (): any => {
	const { id: projectID, tab } = useParams<{ id: string, tab: string }>();
  const { user } = useAuth();
  const history = useHistory();

  // Call trực tiếp api
	useEffect(() => {
		if (projectID) {
        (async () =>  {
          const infoDepartment = await DepartmentRepository.fetchDetailDepartment({ departmentID: projectID });
          if(!infoDepartment?.data?.admins?.includes(user?._id || "")){
            toast.error("Không có quyền truy cập. Bạn không phải là quản trị viên!");
            return history.push("/");
          }
        })();
		}
	}, [projectID]);

  const onClickTab = (tab?: string) => history.push(`/pcm/project/${projectID}/admin/${tab}`)

  return (
    <main className="h-full">
      <header className="sticky flex justify-between items-center top-0 bg-primary-light z-10 h-10 px-6 border-b border-gray-300">
        <div className="h-full">
          <button
            className={
              tab === 'members'
                ? "w-auto h-full p-2 font-bold text-sm border-b-2 border-primary"
                : "w-auto h-full p-2 text-sm text-primary-gray"
            }
            onClick={() => onClickTab('members')}
          >
            Thành viên
          </button>
          <button
            className={
              tab === "groups"
                ? "w-auto h-full p-2 font-bold text-sm border-b-2 border-primary"
                : "w-auto h-full p-2 text-sm text-primary-gray"
            }
            onClick={() => onClickTab('groups')}
          >
            Nhóm dữ liệu
          </button>
          <button
            className={
              tab === "packages"
                ? "w-auto h-full p-2 font-bold text-sm border-b-2 border-primary"
                : "w-auto h-full p-2 text-sm text-primary-gray"
            }
            onClick={() => onClickTab('packages')}
          >
            Gói thầu
          </button>
        </div>
      </header>

      <AppAdminTab />
    </main>
  );
};

export default ProjectAdminManagementPage;