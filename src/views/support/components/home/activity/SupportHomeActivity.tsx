import React, { FC } from "react";
import AccessList from "../dashboard/AccessListSupport";
import ByBusinessSupport from "../dashboard/ByBusinessSupport";

type Props = {
    timeType: string;
};

const SupportHomeActivity: FC<Props> = (props) => {
    const { timeType } = props;
  return (
    <section>
        <div className="block">
            <section>
                <div className="flex h-max">
                    <div className="w-2/3 p-3">
                        {/*<div>Activity</div>*/}
                        <AccessList timeType={timeType} />
                    </div>
                    <div className="w-1/3 pr-3 pt-3 pb-3">
                        <ByBusinessSupport timeType={timeType}/>
                    </div>
                </div>
            </section>
        </div>
    </section>
  );
};

export default SupportHomeActivity;
