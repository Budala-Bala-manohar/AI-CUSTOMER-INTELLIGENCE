import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="border-b border-slate-800 bg-slate-950 px-4 py-4 shadow-sm shadow-slate-900 sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link to="/" className="text-xl font-semibold tracking-tight text-white">
          AI Customer Intelligence
        </Link>
        <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-sm text-slate-300">
          Analytics + AI</span>
      </div>
    </header>
  );
}

export default Navbar;
