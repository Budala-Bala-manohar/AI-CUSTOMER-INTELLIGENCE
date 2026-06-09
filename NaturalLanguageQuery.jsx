import { useState } from 'react';
import { runNaturalLanguageQuery } from '../services/api.js';

function NaturalLanguageQuery() {
  const [query, setQuery] = useState('Who are my top spending customers?');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleQuery = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await runNaturalLanguageQuery(query);
      setResult(response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm shadow-slate-950">
        <h1 className="text-2xl font-semibold text-white">Natural Language Query</h1>
        <p className="mt-2 text-slate-400">
          Ask questions in plain English and get structured customer data results automatically.
        </p>
      </div>

      <form onSubmit={handleQuery} className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm shadow-slate-950">
          <label className="text-sm font-medium text-slate-300">Ask a question</label>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="mt-3 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"
            placeholder="Who are my top spending customers?"
          />
        </div>
        <div className="flex items-end gap-4">
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-3xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Run Query'}
          </button>
        </div>
      </form>

      {result && (
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm shadow-slate-950">
          <h2 className="text-lg font-semibold text-white">Query Results</h2>
          <p className="mt-2 text-slate-400">{result.message || `SQL: ${result.sql}`}</p>

          {result.results && result.results.length > 0 ? (
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-left text-sm text-slate-100">
                <thead className="border-b border-slate-800 text-slate-400">
                  <tr>
                    {Object.keys(result.results[0]).map((column) => (
                      <th key={column} className="px-3 py-2 uppercase tracking-[0.18em]">
                        {column.replaceAll('_', ' ')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.results.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-slate-950' : 'bg-slate-900'}>
                      {Object.values(row).map((value, columnIndex) => (
                        <td key={columnIndex} className="px-3 py-2">
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-6 text-slate-400">No matching results found for this query.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default NaturalLanguageQuery;
