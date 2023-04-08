import { FC } from "react";

import { checkTimeType } from "utils/app";
import { useListCompanyAccess } from 'services/hooks/useSupport';

type Props = {
  timeType: string;
};

const ByBusinessSupport: FC<Props> = ({ timeType }) => {
  const listParam = checkTimeType(timeType);
  const { listCompany } = useListCompanyAccess(listParam);
  let totalAccept = 0;

  /* eslint-disable */
  listCompany.map(item => {
    totalAccept += item.amountAccesses
  })

  return (
    <section className=" bg-primary-light px-6 py-4 mt-3">
      <p className="text-primary-gray text-lg font-bold">Theo doanh nghiệp</p>
      <div className="mt-6 text-primary-gray">
        { listCompany.map((item: any, index) => (
          <div key={index} className="mb-2">
            <p>{item._id.company.name}</p>
            <div className="flex items-center justify-between">
                <div className="t-home-training-progress-bar w-1/4" style={{ width: "100%" }}>
                  <div style={{ width: `${(item.amountAccesses/totalAccept)*100}%` }}></div>
                </div>
              <span className="w-1/12">{item.amountAccesses}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ByBusinessSupport;
