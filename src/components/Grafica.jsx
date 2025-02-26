import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Grafica = ({ etiquetas, datos, nombreGrafica, nombreDatos }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: `${nombreGrafica ? nombreGrafica : "Grafica"}`,
      },
    },
  };

  const data = {
    labels: etiquetas,
    datasets: [
      {
        label: `${nombreDatos ? nombreDatos : "Datos"}`,
        data: datos,
        backgroundColor: "rgb(13,110,253)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

Grafica.propTypes = {
  etiquetas: PropTypes.arrayOf(PropTypes.string).isRequired,
  datos: PropTypes.arrayOf(PropTypes.number).isRequired,
  nombreGrafica: PropTypes.string,
  nombreDatos: PropTypes.string
};

export default Grafica;
