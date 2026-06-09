import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/customers', label: 'Customers' },
  { to: '/segmentation', label: 'Customer Segmentation' },
  { to: '/churn', label: 'Churn Prediction' },
  { to: '/recommendations', label: 'Recommendations' },
  { to: '/insights', label: 'AI Insights' },
  { to: '/query', label: 'Natural Language Query' },
  { to: '/about', label: 'About' },
];

function Sidebar() {
  return (
    <aside className="w-full border-b border-slate-800 bg-slate-900 py-6 lg:w-72 lg:border-r lg:border-b-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-1">
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block rounded-2xl px-4 py-3 text-sm font-medium transition-colors duration-150 ${
                  isActive ? 'bg-slate-800 text-white shadow-md shadow-slate-900' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
