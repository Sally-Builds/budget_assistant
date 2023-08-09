import React from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["2021/2022", "2022/2023", "2023/2024"];

export const data = {
  labels,
  datasets: [
    {
      label: "actualization",
      data: [10, 20, 40],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "estimated",
      data: [10, 20, 40],
      backgroundColor: "rgba(255, 29, 132, 0.5)",
    },
    {
      label: "loss/profit",
      data: [70, 55, 80],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const BarChart = () => {
  return (
    <>
      <Bar options={options} data={data} />;
    </>
  );
};

export default BarChart;
