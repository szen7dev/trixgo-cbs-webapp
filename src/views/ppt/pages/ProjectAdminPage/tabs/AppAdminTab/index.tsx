import { FC } from "react";

import { AuthorTab, AdminDetail, FunctionalTab, ProjectTab, ProjectDetail } from "views/ppt/pages/ProjectAdminPage/components";
import { useParams } from "react-router-dom";
type Props = {
  toggleTab: number;
};

const AppAdminTab: FC<Props> = (props) => {
  const { toggleTab } = props;
  const { id } = useParams<{ id: string }>();
  return (
    <section>
      <div className={toggleTab === 1 ? "block" : "hidden"}>
        {id ?
          <AdminDetail /> :
          <FunctionalTab />
        }
      </div>

      <div className={toggleTab === 2 ? "block" : "hidden"}>
        <AuthorTab />
      </div>

      <div className={toggleTab === 3 ? "block" : "hidden"}>
        {id ? <ProjectDetail /> :
          <ProjectTab />
        }
      </div>
    </section>
  );
};

export default AppAdminTab;