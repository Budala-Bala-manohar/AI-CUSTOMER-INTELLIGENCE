import { useEffect, useState } from 'react';
import { getSegmentation } from '../services/api.js';
import BarChart from '../components/Charts/BarChart.jsx';
import PieChart from '../components/Charts/PieChart.jsx';

function CustomerSegmentation() {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSegmentation()
      .then((response) => setOverview(response.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading || !overview) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm shadow-slate-950">
        Fetching customer segments...
      </div>
    );
  }

  const distributionLabels = Object.keys(overview.segment_distribution || {});
  const distributionCounts = Object.values(overview.segment_distribution || {});

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm shadow-slate-950">
        <h1 className="text-2xl font-semibold text-white">Customer Segmentation</h1>
        <p className="mt-2 max-w-2xl text-slate-400">
          Analyze customer groups with K-Means segmentation, visualize cluster behavior, and align offers to your highest-value segments.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {overview.segments.map((segment) => (
          <div key={segment.name} className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm shadow-slate-950">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">{segment.name}</p>
            <p className="mt-3 text-4xl font-semibold text-white">{segment.count}</p>
            <div className="mt-4 text-sm text-slate-300">
              <p>Avg income: ₹{segment.average_income.toLocaleString()}</p>
              <p>Avg spend: ₹{segment.average_spending}</p>
              <p>Avg age: {segment.average_age}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm shadow-slate-950">
          <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Cluster Distribution</p>
          <PieChart labels={distributionLabels} data={distributionCounts} />
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm shadow-slate-950">
          <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Segment Count Breakdown</p>
          <BarChart labels={distributionLabels} data={distributionCounts} />
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm shadow-slate-950">
        <h2 className="text-lg font-semibold text-white">Cluster Centers</h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {overview.cluster_centers.map((cluster) => (
            <div key={cluster.segment} className="rounded-3xl bg-slate-950 p-4">
              <p className="text-sm uppercase tracking-[0.18em] text-slate-400">{cluster.segment}</p>
              <p className="mt-3 text-xl font-semibold text-white">Age {cluster.age}</p>
              <p className="mt-2 text-slate-300">Income {cluster.annual_income.toLocaleString()}</p>
              <p className="text-slate-300">Spending score {cluster.spending_score}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomerSegmentation;
