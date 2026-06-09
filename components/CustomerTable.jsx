function CustomerTable({ rows }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-sm shadow-slate-900">
      <table className="min-w-full divide-y divide-slate-800 text-sm">
        <thead className="bg-slate-950 text-left text-xs uppercase tracking-[0.12em] text-slate-400">
          <tr>
            <th className="px-4 py-3">Segment</th>
            <th className="px-4 py-3">Customers</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800 bg-slate-900">
          {rows.map((row) => (
            <tr key={row.name} className="hover:bg-slate-800">
              <td className="px-4 py-3 text-slate-100">{row.name}</td>
              <td className="px-4 py-3 text-slate-200">{row.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerTable;
