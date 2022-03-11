import { FC } from "react";
import { useLocation } from "react-router-dom";

import { AdminMember, GroupMember, FunctionalTab, PackageDocumentMember, PackageDocument  } from "../../components";

type Props = {
  toggleTab: number;
};

const AppAdminTab: FC<Props> = (props) => {
  const { toggleTab } = props;
  const { hash: hashParam } = useLocation();
  console.log({ hashParam })
  return (
    <section>
      <div className={toggleTab === 1 ? "block" : "hidden"}>
        <AdminMember />
      </div>

      <div className={toggleTab === 2 ? "block" : "hidden"}>
        {hashParam ? <GroupMember groupID={hashParam.substring(1)} /> : <FunctionalTab />}
      </div>

      <div className={toggleTab === 3 ? "block" : "hidden"}>
        {hashParam ? <PackageDocumentMember groupID={hashParam.substring(1)} /> : <PackageDocument />}
      </div>
    </section>
  );
};

export default AppAdminTab;