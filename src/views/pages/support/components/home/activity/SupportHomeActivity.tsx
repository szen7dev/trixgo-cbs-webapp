import { FC } from "react";
import AccessList from "../dashboard/AccessListSupport";
import ByBusinessSupport from "../dashboard/ByBusinessSupport";

const SupportHomeActivity: FC = () => {
  return (
    <section>
        <div className="block">
            <section>
                <div className="flex h-max">
                    <div className="w-2/3 p-3">
                        {/*<div>Activity</div>*/}
                        <AccessList />
                    </div>
                    <div className="w-1/3 pr-3 pt-3 pb-3">
                        <ByBusinessSupport />
                    </div>
                </div>
            </section>
        </div>
    </section>
  );
};

export default SupportHomeActivity;
