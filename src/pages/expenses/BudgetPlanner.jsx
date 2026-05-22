import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function BudgetPlanner() {
  const [budgets] = useState([
    { id: 1, category: 'Accommodation', budget: 2000, spent: 1500, alert: 75 },
    { id: 2, category: 'Food', budget: 1000, spent: 650, alert: 65 },
    { id: 3, category: 'Transport', budget: 500, spent: 300, alert: 60 },
    { id: 4, category: 'Activities', budget: 800, spent: 400, alert: 50 },
    { id: 5, category: 'Shopping', budget: 600, spent: 280, alert: 47 }
  ])

  const totalBudget = budgets.reduce((sum, b) => sum + b.budget, 0)
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0)
  const remainingBudget = totalBudget - totalSpent

  const getAlertColor = (alert) => {
    if (alert >= 90) return 'danger'
    if (alert >= 75) return 'warning'
    return 'success'
  }

  return (
    <div className="container-fluid p-4">
      <div style={{background: 'linear-gradient(135deg, rgba(51, 102, 255, 0.1), rgba(255, 138, 101, 0.08))', padding: '2rem', borderRadius: '1.5rem', marginBottom: '2rem'}}>
        <h1 className="mb-2 fw-bold" style={{color: '#1f2430'}}>💳 Budget Planner</h1>
        <p className="mb-0" style={{color: '#6c757d'}}>Manage your travel budget efficiently across categories</p>
      </div>
      
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow h-100" style={{background: 'linear-gradient(135deg, #ffffff, #f8fafc)'}}>
            <div className="card-body">
              <div style={{width: '48px', height: '48px', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #3366ff, #0d47a1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem', marginBottom: '1rem'}}>💰</div>
              <h6 className="text-muted small fw-semibold">Total Budget</h6>
              <h2 className="text-primary fw-bold">₹{totalBudget}</h2>
              <small className="text-muted">All categories</small>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow h-100" style={{background: 'linear-gradient(135deg, #ffffff, #f8fafc)'}}>
            <div className="card-body">
              <div style={{width: '48px', height: '48px', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #ef4444, #dc2626)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem', marginBottom: '1rem'}}>💸</div>
              <h6 className="text-muted small fw-semibold">Total Spent</h6>
              <h2 className="text-danger fw-bold">₹{totalSpent}</h2>
              <small className="text-muted">{Math.round((totalSpent/totalBudget)*100)}% of budget</small>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow h-100" style={{background: 'linear-gradient(135deg, #ffffff, #f8fafc)'}}>
            <div className="card-body">
              <div style={{width: '48px', height: '48px', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem', marginBottom: '1rem'}}>🏦</div>
              <h6 className="text-muted small fw-semibold">Remaining</h6>
              <h2 className="text-success fw-bold">₹{remainingBudget}</h2>
              <small className="text-muted">Available to spend</small>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow h-100" style={{background: 'linear-gradient(135deg, #ffffff, #f8fafc)'}}>
            <div className="card-body">
              <div style={{width: '48px', height: '48px', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #06b6d4, #0891b2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem', marginBottom: '1rem'}}>📊</div>
              <h6 className="text-muted small fw-semibold">Budget Status</h6>
              <h2 className="mb-1">
                <span className={`badge ${remainingBudget > 0 ? 'bg-success' : 'bg-danger'}`} style={{fontSize: '0.9rem', padding: '0.5rem 0.75rem'}}>
                  {remainingBudget > 0 ? '✓ On Track' : '⚠ Over Budget'}
                </span>
              </h2>
              <small className="text-muted">Current budget health</small>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow">
        <div className="card-header bg-white border-0 py-3" style={{background: 'linear-gradient(135deg, rgba(51, 102, 255, 0.05), rgba(255, 138, 101, 0.05))'}}>
          <h5 className="mb-0 fw-bold">📈 Budget by Category</h5>
        </div>
        <div className="card-body">
          {budgets.map(item => {
            const percentage = (item.spent / item.budget) * 100
            return (
              <div key={item.id} className="mb-4 p-3" style={{background: '#f8fafc', borderRadius: '0.75rem', border: '1px solid rgba(18, 45, 78, 0.06)'}}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="fw-bold mb-0" style={{color: '#1f2430'}}>{item.category}</h6>
                  <div className="text-end">
                    <small className="text-muted fw-semibold">₹{item.spent}/₹{item.budget}</small>
                    <br />
                    <span className={`badge small mt-1 ${getAlertColor(item.alert) === 'danger' ? 'bg-danger' : getAlertColor(item.alert) === 'warning' ? 'bg-warning' : 'bg-success'}`} style={{fontSize: '0.8rem', padding: '0.4rem 0.6rem'}}>
                      {Math.round(item.alert)}% spent
                    </span>
                  </div>
                </div>
                <div className="progress" style={{height: '28px', borderRadius: '0.5rem'}}>
                  <div 
                    className={`progress-bar fw-bold d-flex align-items-center justify-content-center ${getAlertColor(item.alert) === 'danger' ? 'bg-danger' : getAlertColor(item.alert) === 'warning' ? 'bg-warning' : 'bg-success'}`}
                    style={{width: `${Math.min(percentage, 100)}%`, background: getAlertColor(item.alert) === 'danger' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : getAlertColor(item.alert) === 'warning' ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'linear-gradient(135deg, #10b981, #059669)', color: 'white'}}
                  >
                    {Math.round(percentage) > 5 && <span style={{fontSize: '0.85rem'}}>{Math.round(percentage)}%</span>}
                  </div>
                </div>
                {percentage > 100 && (
                  <small className="text-danger fw-semibold d-block mt-2">⚠️ Budget exceeded by ₹{(item.spent - item.budget).toFixed(2)}</small>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
