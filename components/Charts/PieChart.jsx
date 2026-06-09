import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function PieChart({ labels, data }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const chart = new Chart(canvasRef.current, {
      type: 'pie',
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: ['#38bdf8', '#818cf8', '#f472b6', '#34d399'],
            borderWidth: 0,
          },
        ],
      },
      options: {
        plugins: {
          legend: { position: 'bottom', labels: { color: '#cbd5e1' } },
        },
      },
    });

    return () => chart.destroy();
  }, [labels, data]);

  return <canvas ref={canvasRef} className="h-[320px] w-full"></canvas>;
}

export default PieChart;
