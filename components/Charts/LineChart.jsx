import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function LineChart({ labels, data }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const chart = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Revenue',
            data,
            borderColor: '#38bdf8',
            backgroundColor: 'rgba(56, 189, 248, 0.18)',
            fill: true,
            tension: 0.35,
            pointRadius: 3,
          },
        ],
      },
      options: {
        scales: {
          x: { ticks: { color: '#cbd5e1' }, grid: { display: false } },
          y: { ticks: { color: '#cbd5e1' }, grid: { color: '#334155' } },
        },
        plugins: { legend: { labels: { color: '#cbd5e1' } } },
      },
    });

    return () => chart.destroy();
  }, [labels, data]);

  return <canvas ref={canvasRef} className="h-[320px] w-full"></canvas>;
}

export default LineChart;
