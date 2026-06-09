import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import CustomerSegmentation from './pages/CustomerSegmentation.jsx';
import ChurnPrediction from './pages/ChurnPrediction.jsx';
import Recommendations from './pages/Recommendations.jsx';
import AIInsights from './pages/AIInsights.jsx';
import NaturalLanguageQuery from './pages/NaturalLanguageQuery.jsx';
import About from './pages/About.jsx';
import Customers from './pages/Customers.jsx';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Router>
        <Navbar />
        <div className="flex min-h-[calc(100vh-64px)] flex-col lg:flex-row">
          <Sidebar />
          <main className="flex-1 p-4 lg:p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/segmentation" element={<CustomerSegmentation />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/churn" element={<ChurnPrediction />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/insights" element={<AIInsights />} />
              <Route path="/query" element={<NaturalLanguageQuery />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
        </div>
      </Router>
    </div>
  );
}

export default App;
