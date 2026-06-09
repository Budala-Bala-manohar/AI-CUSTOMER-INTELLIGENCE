import { useState } from 'react';
import { getRecommendations } from '../services/api.js';

const segmentOptions = [
  'Premium Customers',
  'High Value Customers',
  'Regular Customers',
  'Budget Customers',
];

function Recommendations() {
  const [segment, setSegment] = useState(segmentOptions[0]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const response = await getRecommendations(segment);
      setRecommendations(response.data.recommendations);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm shadow-slate-950">
        <h1 className="text-2xl font-semibold text-white">Recommendations</h1>
        <p className="mt-2 text-slate-400">
          Generate actionable product and offer suggestions tailored to each customer segment.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm shadow-slate-950">
          <label className="text-sm font-medium text-slate-300">Select Segment</label>
          <select
            value={segment}
            onChange={(event) => setSegment(event.target.value)}
            className="mt-3 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"
          >
            {segmentOptions.map((option) => (
              <option key={option} value={option} className="bg-slate-950 text-slate-100">
                {option}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={fetchRecommendations}
            className="mt-6 inline-flex items-center justify-center rounded-3xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            {loading ? 'Loading...' : 'Get Recommendations'}
          </button>
        </div>

        <div className="lg:col-span-2 rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm shadow-slate-950">
          <h2 className="text-lg font-semibold text-white">Recommended Offers</h2>
          <div className="mt-6 space-y-4">
            {recommendations.length === 0 ? (
              <p className="text-slate-400">Select a segment and fetch recommendations.</p>
            ) : (
              recommendations.map((item) => (
                <div key={item} className="rounded-3xl bg-slate-950 p-4 text-slate-100">
                  <p className="font-semibold text-white">{item}</p>
                  <p className="mt-2 text-slate-400">Offer tailored for the selected segment to improve conversion and retention.</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recommendations;
