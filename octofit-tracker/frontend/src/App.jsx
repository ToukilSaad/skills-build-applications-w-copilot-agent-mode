import { Link, Route, Routes } from 'react-router-dom'
import './App.css'

function Home() {
  return (
    <div className="container py-5">
      <div className="row align-items-center g-4">
        <div className="col-lg-7">
          <h1 className="display-5 fw-bold">OctoFit Tracker</h1>
          <p className="lead text-muted">
            A modern multi-tier fitness platform for logging activities, building
            teams, and tracking progress in real time.
          </p>
          <div className="d-flex gap-3">
            <Link className="btn btn-primary" to="/dashboard">
              View dashboard
            </Link>
            <Link className="btn btn-outline-secondary" to="/about">
              Learn more
            </Link>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h2 className="h5">What is included?</h2>
              <ul className="mb-0">
                <li>Activity logging</li>
                <li>Team management</li>
                <li>Workout suggestions</li>
                <li>Leaderboard insights</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Dashboard() {
  return (
    <div className="container py-5">
      <h2 className="mb-3">Dashboard</h2>
      <div className="row g-3">
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h3 className="h6">Daily activity</h3>
              <p className="display-6 mb-0">12</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h3 className="h6">Active teams</h3>
              <p className="display-6 mb-0">4</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h3 className="h6">Leaderboard</h3>
              <p className="display-6 mb-0">#2</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function About() {
  return (
    <div className="container py-5">
      <h2 className="mb-3">About OctoFit</h2>
      <p className="text-muted">
        This starter app establishes the presentation, logic, and data layers that
        power a full fitness tracking experience.
      </p>
    </div>
  )
}

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            OctoFit Tracker
          </Link>
          <div className="navbar-nav ms-auto">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
            <Link className="nav-link" to="/about">
              About
            </Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}

export default App
