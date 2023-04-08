import { FC } from "react";
import { checkTimeType } from "utils/app";

import { ChartDoughnutSmall } from "views/support/shareComponents/common";
import { useTypeDeviceAccess } from 'services/hooks/useSupport';

const dataNew =  {
  labels: [],
  datasets: [
    {
      data: [0, 0, 0],
      backgroundColor: ["#0060E1", "rgb(234 179 8)","#10b981"],
      borderWidth: 0,
    },
  ],
};

type Props = {
  timeType: string;
};

const SortByDeviceSupport: FC<Props> = (props) => {
  const { timeType } = props;
  const listParam = checkTimeType(timeType);

  const { listTypeDevice } = useTypeDeviceAccess(listParam);
  let totalList = '';
  let TypeDevice = 0;
  for (const element of listTypeDevice) {
    if(Number(element._id.type) === 1) {
      dataNew.datasets[0].data[0] = element.amountAccesses;
    }
    if(Number(element._id.type) === 2) {
      dataNew.datasets[0].data[1] = element.amountAccesses;
    }
    if(Number(element._id.type) === 2) {
      dataNew.datasets[0].data[2] = element.amountAccesses;
    }
      TypeDevice += element.amountAccesses;
  }
  totalList = '' + TypeDevice;
  return (
    <section className="bg-primary-light px-6 py-4 h-[200px]">
      <p className="text-primary-gray font-bold text-lg">
        Phân loại theo thiết bị
      </p>

      <div className="flex items-center gap-20">
        <div className="ml-8 my-3">
          <div className="w-28">
            <ChartDoughnutSmall _data={dataNew} title={totalList} cutout={38} />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-warning mr-1" />
            <span className="text-sm text-yellow-600">Mobile</span>
          </div>

          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-primary mr-1" />
            <span className="text-sm text-primary">Web</span>
          </div>

          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-positive mr-1" />
            <span className="text-sm text-positive">Tablet</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SortByDeviceSupport;
