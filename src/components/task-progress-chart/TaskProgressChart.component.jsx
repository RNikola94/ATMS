import { Line } from 'react-chartjs-2';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const TaskProgressChart = ({ tasks }) => {
  const taskStats = tasks.reduce(
    (acc, task) => {
      acc[task.status] += 1;
      return acc;
    },
    { 'To Do': 0, 'In Progress': 0, Completed: 0 }
  );

  const data = {
    labels: ['To Do', 'In Progress', 'Completed'],
    datasets: [
      {
        label: 'Tasks',
        data: [taskStats['To Do'], taskStats['In Progress'], taskStats.Completed],
        backgroundColor: ['#f39c12', '#3498db', '#2ecc71'],
      },
    ],
  };

  return <Line data={data} />;
};

export default TaskProgressChart;
