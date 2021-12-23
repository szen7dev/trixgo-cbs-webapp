import { FC } from "react";

import ByOrganizationSupport from "./ByOrganizationSupport";
import ByRegisterListSupport from "./ByRegisterListSupport";
import ByTimeSupport from "./ByTimeSupport";
import ByUniversitySupport from "./ByUniversitySupport";

const SupportRegisterDashboard: FC = () => {
  return (
    <section className="flex">
      <div className="w-2/3 p-3">
        <div className="flex">
          <ByOrganizationSupport />

          <ByTimeSupport />
        </div>

        <ByRegisterListSupport />
      </div>

      <div className="w-1/3 pr-3 pt-3 pb-3">
        <ByUniversitySupport />
      </div>
    </section>
  );
};

export default SupportRegisterDashboard;
