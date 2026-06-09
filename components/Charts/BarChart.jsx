import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function BarChart({ labels, data }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const chart = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Customers',
            data,
            backgroundColor: '#38bdf8',
            borderRadius: 12,
          },
        ],
      },
      options: {
        scales: {
          x: { ticks: { color: '#cbd5e1' }, grid: { display: false } },
          y: { ticks: { color: '#cbd5e1' }, grid: { color: '#334155' } },
        },
        plugins: { legend: { display: false } },
      },
    });

    return () => chart.destroy();
  }, [labels, data]);

  return <canvas ref={canvasRef} className="h-[320px] w-full"></canvas>;
}

export default BarChart;
