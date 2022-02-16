import { FC } from "react";
import { useListCompanyAccess } from 'services/hooks/useSupport';
import moment from 'moment';
import {checkTimeType} from "../../../../../../helpers/app";

type Props = {
  timeType: string;
};

const ByBusinessSupport: FC<Props> = (props) => {
  const { timeType } = props;
  const listParam = checkTimeType(timeType);
  // console.log('listParam',listParam)
  const { listCompany } = useListCompanyAccess(listParam);
  console.log('listCompany1',listCompany)
  return (
    <section className="h-[834px] bg-primary-light px-6 py-4 mt-3">
      <p className="text-primary-gray text-lg font-bold">Theo doanh nghiệp</p>

      <div className="mt-6 text-primary-gray">
        { listCompany.map((item, index) => (
          <div key={index} className="mb-2">
            <p>{item.company.name}</p>
            <div className="flex items-center justify-between">
              <div className="w-full mr-4">
                <div className="h-2 bg-primary w-full" />
              </div>
              <span className="w-1/12">12,2k</span>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-5 text-primary">Xem tất cả</p>
    </section>
  );
};

export default ByBusinessSupport;
