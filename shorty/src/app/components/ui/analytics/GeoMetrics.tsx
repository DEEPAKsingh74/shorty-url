import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

type GeoMetricsProps = {
  topCountries: { country: string; count: number }[];
  topCities: { city: string; count: number }[];
};

const getColorPalette = (count: number, base: string) =>
  Array.from({ length: count }, (_, i) => `${base}${0.3 + i * 0.05})`);

export const GeoMetrics = ({ topCountries, topCities }: GeoMetricsProps) => {
  const countriesData = {
    labels: topCountries.map(item => item.country),
    datasets: [
      {
        label: 'Clicks by Country',
        data: topCountries.map(item => item.count),
        backgroundColor: getColorPalette(topCountries.length, 'rgba(75, 192, 192, '),
      },
    ],
  };

  const citiesData = {
    labels: topCities.map(item => item.city),
    datasets: [
      {
        label: 'Clicks by City',
        data: topCities.map(item => item.count),
        backgroundColor: getColorPalette(topCities.length, 'rgba(153, 102, 255, '),
        borderColor: 'rgba(255, 255, 255, 0.6)',
        borderWidth: 1,
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          boxWidth: 12,
          padding: 15,
        },
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
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Geographic Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-64">
          <h3 className="text-md font-medium text-gray-700 mb-2">Top Countries</h3>
          <Bar data={countriesData} options={commonOptions} />
        </div>

        <div className="h-64">
          <h3 className="text-md font-medium text-gray-700 mb-2">Top Cities</h3>
          <Pie data={citiesData} options={commonOptions} />
        </div>
      </div>
    </div>
  );
};
