import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

type DeviceMetricsProps = {
  devices: { type: string; count: number }[];
  os: { name: string; count: number }[];
  browsers: { name: string; count: number }[];
};

export const DeviceMetrics = ({ devices, os, browsers }: DeviceMetricsProps) => {
  const deviceData = {
    labels: devices.map(item => item.type),
    datasets: [
      {
        label: 'Devices',
        data: devices.map(item => item.count),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const osData = {
    labels: os.map(item => item.name),
    datasets: [
      {
        label: 'Operating Systems',
        data: os.map(item => item.count),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const browserData = {
    labels: browsers.map(item => item.name),
    datasets: [
      {
        label: 'Browsers',
        data: browsers.map(item => item.count),
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-6">Device & Platform Data</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-64">
          <Bar
            data={deviceData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>
        <div className="h-64">
          <Bar
            data={osData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>
        <div className="h-64">
          <Bar
            data={browserData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};