import { FC, useMemo } from "react";

// import cn from "classnames";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

import styles from 'views/cmcs/styles/styles.module.css';

// import ListIcon from "assets/images/icon-bulleted-list.svg";
// import PolygonIcon from "assets/images/icon-polygon.svg";
import CircleIcon from "assets/images/icon-circle.svg";
import { useCmcsDashboard } from 'services/hooks/cmcs/useContractIPC';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
        padding: {
            top: 30,
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
                align: "end" as const,
                anchor: "start" as const,
            },
            ticks: {
                maxRotation: 0,
                minRotation: 0,
                autoSkip: false,
                fontSize: 10
            },
        },
        y: {
            grid: {
                display: true,
                drawBorder: false,
            },
            ticks: {
                min: 0,
                max: 15,
                stepSize: 1,
                autoSkip: false,
                color: "#798295",
                callback: function (arr: number | string) {
                    switch (arr) {
                        case 0:
                            return "0";
                        case 20000:
                            return "20k";
                        case 40000:
                            return "40k";
                        case 60000:
                            return "60k";
                        case 80000:
                            return "80k";
                        case 100000:
                            return "100k";
                        case 120000:
                            return "120k";
                        case 140000:
                            return "140k";
                        case 160000:
                            return "160k";
                    }
                },
            },
        },
    },

    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
        tooltip: {
            enabled: false,
        },
        datalabels: {
            display: false,
            color: "#798295",
            align: "top" as const,
            anchor: "end" as const,
        },
    },
};

const arrMonths = Array.from({ length: 12 }, () => 0);

const ChartRevenueByHour: FC<any> = () => {
    const dataChart = {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24",],
        datasets: [
            {
                data: [0, 0, 0, 0, 0, 0, 0, 0, 23000, 21000, 65000, 145000, 85000, 150000, 23000, 21000, 65000, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: "#0060E1",
                barThickness: 10,
            },
        ],
    };

    return (
        <div className="bg-primary-light">
            <div className="bg-primary-light" style={{ height: "400px", width: "350px"}}>
                <div className="">
                    <p className="font-bold text-primary-gray text-lg">
                        Doanh số theo giờ
                    </p>
                </div>
                <div className={styles.barChart}>
                    <Bar options={options} data={dataChart} />
                </div>
            </div>
        </div>
    );
};

export default ChartRevenueByHour;
