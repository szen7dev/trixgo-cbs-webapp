/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimationEvent } from "chart.js";

function fakeValues(from: number, to: number, prev = 0, step = 1) {
  let current = prev;
  const values = [];

  for (let i = 0; i < (to - from) * 12; i++) {
    const date = new Date();
    date.setDate(1);
    date.setMonth(i);
    if (i === 0) date.setDate(-1);
    values.push({
      x: date.toString(),
      y: (current += 5e8 - Math.floor(Math.random() * 100000000 * step)),
    });
  }

  return values;
}
const options = {
  // responsive: true,
  maintainAspectRatio: false,
	tooltip: {
		enabled: false,
	},
};

const data = {
  datasets: [
    {
      label: "Kế hoạch chi",
      data: fakeValues(2020, 2023, 0, 5),
      borderWidth: 2,
      backgroundColor: "transparent",
      borderColor: "#85B2ED",
    },
    {
      label: "Lũy kế chi kế hoạch chi ",
      data: fakeValues(2020, 2023, 1e8, 7),
      borderWidth: 2,
      backgroundColor: "transparent",
      borderColor: "#0060E1",
    },
    {
      label: "Thực tế chi",
      data: fakeValues(2020, 2023, 8e8, 8),
      borderWidth: 2,
      backgroundColor: "transparent",
      borderColor: "#C4784B",
    },
    {
      label: "Lũy kế chi thực tế chi ",
      data: fakeValues(2020, 2023, 1e9, 9),
      borderWidth: 2,
      backgroundColor: "transparent",
      borderColor: "#A75525",
    },
  ],
};

const configs = {
  data,
  options,
};

export default configs;
