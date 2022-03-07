import { FC, useState } from "react";
import { useHistory } from "react-router-dom";
import AppAdminTab from "./tabs/AppAdminTab";
const ProjectAdminPage: FC = () => {
  const [toggleTab, setToggleTab] = useState(1);
  const history = useHistory();
  const handleToggleTab = (index: number) => {
    setToggleTab(index);
  };

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
            onClick={() => {
              handleToggleTab(1);
              history.push('/pcm/admin');
            }}
          >
            Nhóm chức năng
          </button>
          <button
            className={
              toggleTab === 2
                ? "w-auto h-full p-2 font-bold text-sm border-b-2 border-primary"
                : "w-auto h-full p-2 text-sm text-primary-gray"
            }
            onClick={() => {
              if (toggleTab == 3) {
                history.push('/pcm/admin');
              };
              handleToggleTab(2);
            }}
          >
            Phân quyền chức năng
          </button>
          <button
            className={
              toggleTab === 3
                ? "w-auto h-full p-2 font-bold text-sm border-b-2 border-primary"
                : "w-auto h-full p-2 text-sm text-primary-gray"
            }
            onClick={() => {
              handleToggleTab(3);
              history.push('/pcm/admin/project');
            }}
          >
            Dự án
          </button>
        </div>
      </header>

      <AppAdminTab toggleTab={toggleTab} />
    </main>
  );
};

export default ProjectAdminPage;
