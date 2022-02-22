import { FC } from "react";

import AuthorTab from "../components/AuthorTab";
import FunctionalTab from "../components/FunctionalTab";

type Props = {
  toggleTab: number;
};

const AppAdminTab: FC<Props> = (props) => {
  const { toggleTab } = props;

  return (
    <section>
      <div className={toggleTab === 1 ? "block" : "hidden"}>
        <FunctionalTab />
      </div>

      <div className={toggleTab === 2 ? "block" : "hidden"}>
        <AuthorTab />
      </div>
    </section>
  );
};

export default AppAdminTab;
