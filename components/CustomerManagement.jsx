import { useEffect, useState } from 'react'
import api from '../services/api.js'

function CustomerManagement({ initialData = [] }) {
  const [rows, setRows] = useState(initialData)
  const [q, setQ] = useState('')
  const [city, setCity] = useState('')
  const [segment, setSegment] = useState('')

  useEffect(() => setRows(initialData), [initialData])

  useEffect(() => {
    const params = {}
    if (q) params.q = q
    if (city) params.city = city
    if (segment) params.segment = segment
    api
      .get('/customers', { params })
      .then((res) => setRows(res.data))
      .catch(() => setRows([]))
  }, [q, city, segment])

  const cities = Array.from(new Set(rows.map((r) => r.city).filter(Boolean))).slice(0, 50)
  const segments = Array.from(new Set(rows.map((r) => r.customer_segment).filter(Boolean)))

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-2">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name..." className="rounded px-3 py-2 text-slate-900" />
          <select value={city} onChange={(e) => setCity(e.target.value)} className="rounded px-3 py-2 text-slate-900">
            <option value="">All Cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select value={segment} onChange={(e) => setSegment(e.target.value)} className="rounded px-3 py-2 text-slate-900">
            <option value="">All Segments</option>
            {segments.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-xs text-slate-400 uppercase">
            <tr>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Age</th>
              <th className="px-3 py-2">City</th>
              <th className="px-3 py-2">Occupation</th>
              <th className="px-3 py-2">Monthly Salary</th>
              <th className="px-3 py-2">Monthly Spend</th>
              <th className="px-3 py-2">Segment</th>
              <th className="px-3 py-2">Churn</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.customer_id} className="odd:bg-slate-950 even:bg-slate-900 hover:bg-slate-800">
                <td className="px-3 py-2">{r.customer_name}</td>
                <td className="px-3 py-2">{r.age}</td>
                <td className="px-3 py-2">{r.city}</td>
                <td className="px-3 py-2">{r.occupation}</td>
                <td className="px-3 py-2">{r.monthly_salary?.toLocaleString?.() ?? r.monthly_salary}</td>
                <td className="px-3 py-2">{r.monthly_spend}</td>
                <td className="px-3 py-2">{r.customer_segment}</td>
                <td className="px-3 py-2">{r.churn === 1 ? 'At Risk' : 'Safe'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CustomerManagement
