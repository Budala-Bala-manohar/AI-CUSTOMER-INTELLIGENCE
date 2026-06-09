function About() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm shadow-slate-950">
        <h1 className="text-2xl font-semibold text-white">About AI Customer Intelligence</h1>
        <p className="mt-2 text-slate-400">
          This platform blends machine learning with rich dashboards to deliver customer segmentation, churn prediction, and personalized offer recommendations.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm shadow-slate-950">
          <h2 className="text-lg font-semibold text-white">Mission</h2>
          <p className="mt-4 text-slate-300">
            Help businesses move beyond static reporting by applying predictive analytics to customer behavior, revenue, and retention strategies.
          </p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm shadow-slate-950">
          <h2 className="text-lg font-semibold text-white">Platform Goals</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-300">
            <li>Automatic customer segmentation using K-Means.</li>
            <li>Real-time churn risk prediction using Random Forest.</li>
            <li>Actionable recommendations for every customer tier.</li>
            <li>Interactive charts and modern dark theme UI.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;
