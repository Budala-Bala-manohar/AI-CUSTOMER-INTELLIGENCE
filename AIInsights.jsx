import { useEffect, useState } from 'react';
import { getAIInsights, downloadPdfReport } from '../services/api.js';

function AIInsights() {
  const [insights, setInsights] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [topCities, setTopCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadLoading, setDownloadLoading] = useState(false);

  useEffect(() => {
    getAIInsights()
      .then((response) => {
        setInsights(response.data.insights || []);
        setTopCustomers(response.data.top_customers || []);
        setTopCities(response.data.top_cities || []);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDownload = async () => {
    setDownloadLoading(true);
    try {
      const response = await downloadPdfReport();
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'ai-insights-report.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setDownloadLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm shadow-slate-950">
        Loading AI insights...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm shadow-slate-950">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">AI Insights Generator</h1>
            <p className="mt-2 text-slate-400">
              Automatically generated business insights from customer behavior, revenue performance, and retention signals.
            </p>
          </div>
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloadLoading}
            className="inline-flex items-center justify-center rounded-3xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-50"
          >
            {downloadLoading ? 'Generating...' : 'Download Insights PDF'}
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm shadow-slate-950">
          <h2 className="text-lg font-semibold text-white">Top AI Insights</h2>
          <ul className="mt-5 space-y-4 text-slate-200">
            {insights.map((insight) => (
              <li key={insight} className="rounded-3xl bg-slate-950 p-4">
                {insight}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm shadow-slate-950">
            <h2 className="text-lg font-semibold text-white">Top Customers</h2>
            <div className="mt-5 space-y-3">
              {topCustomers.map((customer) => (
                <div key={customer.customer_id} className="rounded-3xl bg-slate-950 p-4">
                  <p className="font-semibold text-white">{customer.customer_name}</p>
                  <p className="text-slate-400">{customer.city} — {customer.customer_segment}</p>
                  <p className="mt-2 text-cyan-300">₹{customer.monthly_spend.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm shadow-slate-950">
            <h2 className="text-lg font-semibold text-white">Top Cities</h2>
            <div className="mt-5 space-y-3">
              {topCities.map((city) => (
                <div key={city.city} className="rounded-3xl bg-slate-950 p-4">
                  <p className="font-semibold text-white">{city.city}</p>
                  <p className="text-slate-400">₹{city.annual_revenue.toLocaleString()} annual revenue</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIInsights;
