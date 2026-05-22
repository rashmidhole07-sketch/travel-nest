import { useState, useMemo } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function ExpenseAnalytics() {
  const [expenses] = useState(() => {
    const now = Date.now()
    return [
      { category: 'Food', amount: 450, date: new Date(now - 1 * 24 * 60 * 60 * 1000) },
      { category: 'Transport', amount: 200, date: new Date(now - 3 * 24 * 60 * 60 * 1000) },
      { category: 'Activities', amount: 150, date: new Date(now - 5 * 24 * 60 * 60 * 1000) },
      { category: 'Shopping', amount: 300, date: new Date(now - 10 * 24 * 60 * 60 * 1000) },
      { category: 'Hotel', amount: 450, date: new Date(now - 25 * 24 * 60 * 60 * 1000) }
    ]
  })

  const [timeframe, setTimeframe] = useState('month')

  const filteredExpenses = useMemo(() => {
    const now = new Date()
    return expenses.filter((e) => {
      const daysAgo = (now - e.date) / (1000 * 60 * 60 * 24)
      if (timeframe === 'week') return daysAgo <= 7
      if (timeframe === 'month') return daysAgo <= 30
      return true // 'all'
    })
  }, [expenses, timeframe])

  const total = filteredExpenses.reduce((sum, e) => sum + e.amount, 0)
  
  const periodDays = useMemo(() => {
    if (timeframe === 'week') return 7
    if (timeframe === 'month') return 30
    if (filteredExpenses.length === 0) return 1
    const dates = filteredExpenses.map(e => e.date.getTime())
    const oldestDate = Math.min(...dates)
    const newestDate = Math.max(...dates)
    const days = (newestDate - oldestDate) / (1000 * 60 * 60 * 24)
    return Math.max(1, Math.ceil(days))
  }, [timeframe, filteredExpenses])
  
  const categoryCount = new Set(filteredExpenses.map((expense) => expense.category)).size
  const periodLabel = timeframe === 'week' ? 'Last 7 days' : timeframe === 'month' ? 'Last 30 days' : 'All available data'

  const getCategoryColor = (category) => {
    const colors = {
      Food: '#FF6B6B',
      Transport: '#4ECDC4',
      Activities: '#95E1D3',
      Shopping: '#F38181',
      Hotel: '#AA96DA'
    }
    return colors[category] || '#ccc'
  }

  const sortedExpenses = [...filteredExpenses].sort((a, b) => b.amount - a.amount)

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold mb-0">📊 Expense Analytics</h1>
          <small className="text-muted">{periodLabel}</small>
        </div>
        <div className="btn-group" role="group">
          <button 
            type="button" 
            className={`btn ${timeframe === 'week' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setTimeframe('week')}
          >
            Week
          </button>
          <button 
            type="button" 
            className={`btn ${timeframe === 'month' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setTimeframe('month')}
          >
            Month
          </button>
          <button 
            type="button" 
            className={`btn ${timeframe === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setTimeframe('all')}
          >
            All Time
          </button>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <h6 className="text-muted small">Total Spent</h6>
              <h2 className="text-danger fw-bold">₹{total}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <h6 className="text-muted small">Average Daily</h6>
              <h2 className="text-primary fw-bold">₹{(total / periodDays).toFixed(0)}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <h6 className="text-muted small">Categories</h6>
              <h2 className="text-success fw-bold">{categoryCount}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <h6 className="text-muted small">Top Category</h6>
              <h2 className="fw-bold">{sortedExpenses[0]?.category}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">Pie Chart Breakdown</h5>
            </div>
            <div className="card-body p-5">
              <div style={{textAlign: 'center'}}>
                <svg width="300" height="300" viewBox="0 0 300 300" style={{margin: '0 auto'}}>
                  {filteredExpenses.map((item, idx) => {
                    const radius = 100
                    
                    return (
                      <circle
                        key={idx}
                        cx="150"
                        cy="150"
                        r={radius}
                        fill={getCategoryColor(item.category)}
                        opacity="0.3"
                      />
                    )
                  })}
                  <circle cx="150" cy="150" r="80" fill="white" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">Expense Distribution</h5>
            </div>
            <div className="card-body">
              {sortedExpenses.map((item, idx) => {
                const percentage = (item.amount / total) * 100
                return (
                  <div key={idx} className="mb-4">
                    <div className="d-flex justify-content-between mb-2">
                      <div>
                        <span 
                          style={{
                            display: 'inline-block',
                            width: '12px',
                            height: '12px',
                            backgroundColor: getCategoryColor(item.category),
                            marginRight: '8px',
                            borderRadius: '2px'
                          }}
                        ></span>
                        <strong>{item.category}</strong>
                      </div>
                      <div className="text-end">
                        <strong className="d-block">₹{item.amount}</strong>
                        <small className="text-muted">{percentage.toFixed(1)}%</small>
                      </div>
                    </div>
                    <div className="progress" style={{height: '8px'}}>
                      <div 
                        className="progress-bar" 
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: getCategoryColor(item.category)
                        }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
