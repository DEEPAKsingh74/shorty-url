import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type ClickMetricsProps = {
  totalClicks: number;
  uniqueClicks: number;
  clickTrend: { date: string; count: number }[];
};

export const ClickMetrics = ({
  totalClicks,
  uniqueClicks,
  clickTrend,
}: ClickMetricsProps) => {
  const trendData = {
    labels: clickTrend.map(item => item.date),
    datasets: [
      {
        label: 'Clicks per Day',
        data: clickTrend.map(item => item.count),
        borderColor: '#3B82F6', // Tailwind blue-500
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: true,
        tension: 0.3,
        pointRadius: 3,
        pointBackgroundColor: '#3B82F6',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: { display: true, text: 'Date' },
        ticks: { maxRotation: 45, minRotation: 0 },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Clicks' },
        grid: { color: '#f3f4f6' }, // Tailwind gray-100
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { boxWidth: 12, padding: 20 },
      },
      tooltip: {
        callbacks: {
          // @ts-ignore
          label: (context: TooltipItem<'line'>) => `${context.raw} clicks`,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Click Analytics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-blue-50 p-5 rounded-lg">
          <p className="text-sm font-medium text-blue-700">Total Clicks</p>
          <p className="text-3xl font-bold text-blue-900">{totalClicks}</p>
        </div>
        <div className="bg-green-50 p-5 rounded-lg">
          <p className="text-sm font-medium text-green-700">Unique Clicks</p>
          <p className="text-3xl font-bold text-green-900">{uniqueClicks}</p>
        </div>
      </div>

      <div className="h-64">
        <Line data={trendData} options={options} />
      </div>
    </div>
  );
};
