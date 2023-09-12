import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

const LineChart = ({ id, setSelectedMachine }) => {
  const [dataTime, setDataTime] = useState([]);
  const [dataBasinc, setDataBasinc] = useState([]);
  const [dataPozisyon, setDataPozisyon] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/makinaVerileri", {
          params: {
            id: Number(id),
          },
        });
        const data = res.data;
        const time = data.map((d) => d.zaman.split("T")[1].slice(0, 5));
        const basinc = data.map((d) => d.basınç_değeri);
        const pozisyon = data.map((d) => d.pozisyon_değeri);
        setDataTime(time);
        setDataBasinc(basinc);
        setDataPozisyon(pozisyon);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const options = {
    plugins: {
      legend: true,
    },
    scales: {
      y: {
        min: 0,
        max: 200,
      },
    },
  };

  const data = {
    labels: dataTime,
    datasets: [
      {
        label: "Basınç Değeri",
        data: dataBasinc,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Pozisyon Değeri",
        data: dataPozisyon,
        fill: false,
        backgroundColor: "rgb(54, 162, 235)",
        borderColor: "rgba(54, 162, 235, 0.2)",
      },
    ],
  };
  return (
    <>
      <button
        style={{
          width: "4rem",
          height: "50px",
          backgroundColor: "#3f51b5",
          color: "white",
          borderRadius: "10px",
          marginBottom: "80px",
          position: "absolute",
          top: "20px",
          right: "20px",
          border: "none",
        }}
        onClick={() => setSelectedMachine(false)}
      >
        Geri
      </button>
      <div>
        <Line data={data} options={options}></Line>
      </div>
    </>
  );
};

export default LineChart;
