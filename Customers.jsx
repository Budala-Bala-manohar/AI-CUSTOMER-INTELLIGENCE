import { useEffect, useState } from 'react'
import CustomerManagement from '../components/CustomerManagement.jsx'
import api from '../services/api.js'

function Customers() {
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    api.get('/customers').then((res) => setCustomers(res.data))
  }, [])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Customer Management</h2>
      <CustomerManagement initialData={customers} />
    </div>
  )
}

export default Customers
