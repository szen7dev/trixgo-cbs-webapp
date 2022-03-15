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
  ArcElement
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

import getPlugins from "views/support/utils/chart";

interface Props {
  _data: {
    datasets: Array<any>;
  };
  title?: string;
  rotation?: number;
  cutout?: number;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  TimeScale,
  ArcElement
);

const options = {
  responsive: true,
  maintainAspectRatio: true,
};

export const ChartDoughnutSmall: React.FC<Props> = ({
  _data,
  title = "",
  rotation,
  cutout = 36,
}) => {
  const plugins = React.useMemo(
    () =>
      getPlugins(title, {
        titleSize: 24,
        bold: false,
      }),
    [title]
  );

  return (
    <Doughnut
      key={Math.random()}
      data={_data}
      options={{
        ...options,
        rotation,
        cutout,
        plugins: {
          datalabels: { display: false },
          tooltip: { enabled: true },
        },
      }}
      plugins={plugins}
    />
  );
};