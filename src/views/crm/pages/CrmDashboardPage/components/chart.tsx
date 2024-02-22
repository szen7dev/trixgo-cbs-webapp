import { FC } from "react";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import styles from 'views/cmcs/styles/styles.module.css';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

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
                        case 100000:
                            return "100k";
                        case 500000:
                            return "500k";
                        case 1000000:
                            return "1000k";
                        case 5000000:
                            return "5000k";
                        case 10000000:
                            return "10.000k";
                        case 20000000:
                            return "20.000k";
                        case 30000000:
                            return "30.000k";
                        case 40000000:
                            return "40.000k";
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
            display: true,
            color: "#798295",
            align: "top" as const,
            anchor: "end" as const,
        },
    },
}

const ChartGroupBy: FC<any> = ({array_hours, array_amount}) => {
    const dataChart = {
        labels: array_hours,
        datasets: [
            {
                data: array_amount,
                backgroundColor: "#0088FF",
                maxBarThickness: 46,
            },
        ],
    };

    return (
        <div className="bg-primary-light">
            <div className="bg-primary-light w-full" style={{ height: "200px"}}>
                <div className={styles.barChart}>
                    <Bar options={options} data={dataChart} />
                </div>
            </div>
        </div>
    );
};

export default ChartGroupBy;