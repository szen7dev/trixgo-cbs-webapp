import { FC, useEffect } from "react";

import { AuthorTab, AdminDetail, FunctionalTab } from "views/ppt/pages/ProjectAdminManagementPage/components";
import { useLocation } from "react-router-dom";
type Props = {
  toggleTab: number;
};

const AppAdminTab: FC<Props> = (props) => {
  const { toggleTab } = props;
  const { hash: hashParam } = useLocation();

  return (
    <section>
      <div className={toggleTab === 1 ? "block" : "hidden"}>
        Demo Page
        {/* {id ?
          <AdminDetail /> :
          <AuthorTab />
        } */}
      </div>

      <div className={toggleTab === 2 ? "block" : "hidden"}>
        {hashParam ? <AdminDetail /> : <FunctionalTab />}
      </div>
    </section>
  );
};

export default AppAdminTab;