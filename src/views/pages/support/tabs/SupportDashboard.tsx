import { FC } from "react";

import ByOrganizationSupport from "../components/dashboard/ByOrganizationSupport";
import ByRegisterListSupport from "../components/dashboard/ByRegisterListSupport";
import ByTimeSupport from "../components/dashboard/ByTimeSupport";
import ByUniversitySupport from "../components/dashboard/ByUniversitySupport";

const SupportList: FC = () => {
  return (
    <section className="flex">
      <div className="w-2/3 h-full max-w-full">
        <div className="flex">
          <ByOrganizationSupport />

          <ByTimeSupport />
        </div>

        <ByRegisterListSupport />
      </div>

      <div className="w-1/3 h-full">
        <ByUniversitySupport />
      </div>
    </section>
  );
};

export default SupportList;
