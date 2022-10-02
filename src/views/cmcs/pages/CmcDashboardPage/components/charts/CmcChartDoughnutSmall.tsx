import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  TimeScale,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

import getPlugins from "./CmcDoughnutChart";

interface Props {
  _data: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    datasets: Array<any>;
  };
  title?: string;
  subtitle?: string;
  rotation?: number;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  TimeScale
);

const options = {
  cutout: 36,
  responsive: true,
  maintainAspectRatio: true,
};

const ChartDoughnutSmall: React.FC<Props> = ({
  _data,
  title = "",
  subtitle = "",
  rotation,
}) => {
  const plugins = React.useMemo(
    () => {
      return getPlugins(title, subtitle, {
        titleSize: 24,
        subtitleSize: 10,
        bold: false,
      })
    },
    [title, subtitle]
  );

  if(title === '0') return <></>;

  return (
    <Doughnut
      data={_data}
      options={{
        ...options,
        rotation,
        plugins: {
          datalabels: { display: false },
          tooltip: { enabled: false },
        },
      }}
      plugins={plugins}
    />
  );
};

export default ChartDoughnutSmall;
