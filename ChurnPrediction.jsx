import { useState } from 'react';
import { getChurnPrediction, downloadPdfReport } from '../services/api.js';

function ChurnPrediction() {
  const [form, setForm] = useState({ age: 32, annual_income: 65, tenure: 4, monthly_spend: 120 });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await getChurnPrediction(form);
      setResult(response.data);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = async () => {
    setReportLoading(true);
    try {
      const response = await downloadPdfReport();
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'customer-churn-report.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setReportLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm shadow-slate-950">
        <h1 className="text-2xl font-semibold text-white">Churn Prediction</h1>
        <p className="mt-2 text-slate-400">
          Predict customer churn probability and get explainable reasons for why a customer may be at risk.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm shadow-slate-950">
          <label className="text-sm font-medium text-slate-300">Age</label>
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"
          />
          <label className="mt-4 block text-sm font-medium text-slate-300">Annual Income ($k)</label>
          <input
            type="number"
            name="annual_income"
            value={form.annual_income}
            onChange={handleChange}
            className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"
          />
          <label className="mt-4 block text-sm font-medium text-slate-300">Tenure (years)</label>
          <input
            type="number"
            name="tenure"
            value={form.tenure}
            onChange={handleChange}
            className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"
          />
          <label className="mt-4 block text-sm font-medium text-slate-300">Monthly Spend ($)</label>
          <input
            type="number"
            name="monthly_spend"
            value={form.monthly_spend}
            onChange={handleChange}
            className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"
          />
          <button
            type="submit"
            className="mt-6 inline-flex items-center justify-center rounded-3xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            {loading ? 'Predicting...' : 'Run Prediction'}
          </button>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm shadow-slate-950">
          <h2 className="text-lg font-semibold text-white">Prediction Results</h2>
          <div className="mt-6 rounded-3xl bg-slate-950 p-6 text-center">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Outcome</p>
            <p className="mt-4 text-3xl font-semibold text-white">{result?.prediction || 'Awaiting input'}</p>
            {result && (
              <p className="mt-3 text-slate-300">
                Probability: <span className="font-semibold text-cyan-300">{result.probability}%</span>
              </p>
            )}
            <div className="mt-5 text-left text-slate-300">
              <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Why this prediction?</p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                {result?.explanation?.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              onClick={handleDownloadReport}
              disabled={reportLoading}
              className="mt-6 inline-flex items-center justify-center rounded-3xl bg-slate-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:opacity-50"
            >
              {reportLoading ? 'Preparing report...' : 'Download Retention Report'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ChurnPrediction;
