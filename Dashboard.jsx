import { useEffect, useState } from 'react';
import { getDashboardStats, getAIInsights, downloadPdfReport } from '../services/api.js';
import PieChart from '../components/Charts/PieChart.jsx';
import BarChart from '../components/Charts/BarChart.jsx';
import LineChart from '../components/Charts/LineChart.jsx';

function Dashboard() {
  const [overview, setOverview] = useState(null);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getDashboardStats(), getAIInsights()])
      .then(([statsResponse, insightsResponse]) => {
        setOverview(statsResponse.data);
        setInsights(insightsResponse.data.insights || []);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDownloadReport = async () => {
    const response = await downloadPdfReport();
    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'customer-intelligence-report.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading || !overview) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-lg shadow-slate-950">
        Loading dashboard data...
      </div>
    );
  }

  const segmentLabels = Object.keys(overview.segment_distribution || {});
  const segmentCounts = Object.values(overview.segment_distribution || {});
  const churnLabels = Object.keys(overview.churn_by_segment || {});
  const churnCounts = Object.values(overview.churn_by_segment || {});

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm shadow-slate-950">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white">Executive Dashboard</h1>
            <p className="mt-2 max-w-2xl text-slate-400">
              Real-time AI analytics for customer segmentation, churn prediction, revenue trends and growth opportunities.
            </p>
          </div>
          <button
            type="button"
            onClick={handleDownloadReport}
            className="inline-flex items-center justify-center rounded-3xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Download PDF Report
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm shadow-slate-950">
          <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Total Customers</p>
          <p className="mt-4 text-4xl font-semibold text-white">{overview.total_customers}</p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm shadow-slate-950">
          <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Annual Revenue</p>
          <p className="mt-4 text-4xl font-semibold text-emerald-400">₹{overview.total_revenue.toLocaleString()}</p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm shadow-slate-950">
          <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Churn Risk</p>
          <p className="mt-4 text-4xl font-semibold text-rose-400">{overview.churn_risk_customers}</p>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm shadow-slate-950">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Revenue Trend</p>
              <p className="text-2xl font-semibold text-white">₹{overview.total_revenue.toLocaleString()}</p>
            </div>
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">Forecast</span>
          </div>
          <LineChart labels={overview.revenue_labels} data={overview.revenue_trend} />
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm shadow-slate-950">
          <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Segment Distribution</p>
          <PieChart labels={segmentLabels} data={segmentCounts} />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm shadow-slate-950">
          <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Churn by Segment</p>
          <div className="mt-4">
            <BarChart labels={churnLabels} data={churnCounts} />
          </div>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm shadow-slate-950">
          <p className="text-sm uppercase tracking-[0.18em] text-slate-400">AI Insights</p>
          <ul className="mt-4 space-y-3 text-slate-200">
            {insights.map((insight) => (
              <li key={insight} className="rounded-3xl bg-slate-950 p-4">{insight}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm shadow-slate-950">
          <h2 className="text-lg font-semibold text-white">Top Customers</h2>
          <div className="mt-5 space-y-3">
            {overview.top_customers.map((customer) => (
              <div key={customer.customer_id} className="rounded-3xl bg-slate-950 p-4">
                <p className="font-semibold text-white">{customer.customer_name}</p>
                <p className="text-sm text-slate-400">{customer.city} • {customer.customer_segment}</p>
                <p className="mt-2 text-lg font-semibold text-cyan-300">₹{customer.monthly_spend.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm shadow-slate-950">
          <h2 className="text-lg font-semibold text-white">Top Cities by Revenue</h2>
          <div className="mt-5 space-y-3">
            {overview.top_cities_by_revenue.map((city) => (
              <div key={city.city} className="rounded-3xl bg-slate-950 p-4">
                <p className="font-semibold text-white">{city.city}</p>
                <p className="text-slate-400">₹{city.annual_revenue.toLocaleString()} annual revenue</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
