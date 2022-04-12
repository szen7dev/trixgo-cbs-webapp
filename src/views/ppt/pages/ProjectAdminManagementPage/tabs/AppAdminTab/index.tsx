import { FC } from "react";
import { useParams, useLocation } from "react-router-dom";

import { AdminMember, GroupMember, FunctionalTab, PackageDocumentMember, PackageDocument  } from "../../components";

const AppAdminTab: FC = () => {
  const { pathname } = useLocation();
  const { tab, itemID } = useParams<{ tab: string, itemID: string }>()

  return (
    <section>
      <div className={tab === 'members' ? "block" : "hidden"}>
        <AdminMember />
      </div>

      <div className={tab === "groups" ? "block" : "hidden"}>
        {(itemID && pathname.endsWith('members')) ? <GroupMember groupID={itemID} /> : <FunctionalTab />}
      </div>

      <div className={tab === "packages" ? "block" : "hidden"}>
        {(itemID && pathname.endsWith('members')) ? <PackageDocumentMember packageID={itemID} /> : <PackageDocument />}
      </div>
    </section>
  );
};

export default AppAdminTab;