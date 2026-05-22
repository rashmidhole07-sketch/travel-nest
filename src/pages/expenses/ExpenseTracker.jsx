import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState([
    { id: 1, category: 'Food', amount: 450, date: '2024-06-15', description: 'Restaurant dinners' },
    { id: 2, category: 'Transport', amount: 200, date: '2024-06-16', description: 'Taxi & metro' },
    { id: 3, category: 'Activities', amount: 150, date: '2024-06-16', description: 'Museum tickets' },
    { id: 4, category: 'Shopping', amount: 300, date: '2024-06-17', description: 'Souvenirs' },
    { id: 5, category: 'Hotel', amount: 450, date: '2024-06-17', description: 'Hotel night' }
  ])

  const [formData, setFormData] = useState({
    category: 'Food',
    amount: '',
    date: '',
    description: ''
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const categories = ['Food', 'Transport', 'Activities', 'Shopping', 'Hotel', 'Other']

  const validate = () => {
    const nextErrors = {}
    const amount = Number(formData.amount)

    if (!categories.includes(formData.category)) nextErrors.category = 'Choose a valid category'
    if (!formData.amount) nextErrors.amount = 'Amount is required'
    else if (!Number.isFinite(amount) || amount <= 0) nextErrors.amount = 'Enter an amount greater than 0'
    if (!formData.date) nextErrors.date = 'Date is required'
    if (!formData.description.trim()) nextErrors.description = 'Description is required'
    else if (formData.description.length > 80) nextErrors.description = 'Description must be 80 characters or less'

    return nextErrors
  }

  const handleAddExpense = (e) => {
    e.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    setTouched({ category: true, amount: true, date: true, description: true })
    if (Object.keys(nextErrors).length > 0) return

    setExpenses([...expenses, {
      id: expenses.length + 1,
      ...formData,
      description: formData.description.trim(),
      amount: parseFloat(formData.amount)
    }])
    setFormData({ category: 'Food', amount: '', date: '', description: '' })
    setErrors({})
    setTouched({})
  }

  const handleBlur = (field) => () => {
    setTouched((current) => ({ ...current, [field]: true }))
    setErrors(validate())
  }

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)

  const categoryTotals = categories.reduce((acc, cat) => {
    acc[cat] = expenses.filter(e => e.category === cat).reduce((sum, e) => sum + e.amount, 0)
    return acc
  }, {})

  const getCategoryColor = (category) => {
    const colors = {
      Food: '#FF6B6B',
      Transport: '#4ECDC4',
      Activities: '#95E1D3',
      Shopping: '#F38181',
      Hotel: '#AA96DA',
      Other: '#FCBAD3'
    }
    return colors[category] || '#ccc'
  }

  return (
    <div className="container-fluid p-4">
      <h1 className="mb-4 fw-bold">💰 Expense Tracker</h1>
      
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <h6 className="text-muted small">Total Expenses</h6>
              <h2 className="text-danger fw-bold">₹{totalExpenses}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <h6 className="text-muted small">Transactions</h6>
              <h2 className="text-primary fw-bold">{expenses.length}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <h6 className="text-muted small">Average Expense</h6>
              <h2 className="text-success fw-bold">₹{(totalExpenses / expenses.length).toFixed(2)}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <h6 className="text-muted small">Top Category</h6>
              <h2 className="text-info fw-bold">
                {Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'}
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">Recent Expenses</h5>
            </div>
            <div className="card-body">
              {expenses.map(expense => (
                <div key={expense.id} className="border-bottom pb-3 mb-3 last-child-no-border">
                  <div className="row align-items-center">
                    <div className="col-md-7">
                      <div className="d-flex align-items-start">
                        <div 
                          className="rounded-circle me-3" 
                          style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: getCategoryColor(expense.category),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <small style={{color: 'white', fontWeight: 'bold'}}>
                            {expense.category[0]}
                          </small>
                        </div>
                        <div>
                          <h6 className="fw-bold mb-1">{expense.category}</h6>
                          <small className="text-muted">{expense.description}</small>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <small className="text-muted">{expense.date}</small>
                    </div>
                    <div className="col-md-2 text-end">
                      <h6 className="fw-bold">₹{expense.amount}</h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">Add Expense</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleAddExpense} noValidate>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Category</label>
                  <select 
                    className={`form-select ${touched.category && errors.category ? 'is-invalid' : ''}`}
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    onBlur={handleBlur('category')}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  {touched.category && errors.category && <div className="invalid-feedback">{errors.category}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Amount (₹)</label>
                  <input 
                    type="number" 
                    className={`form-control ${touched.amount && errors.amount ? 'is-invalid' : ''}`} 
                    step="0.01"
                    min="0.01"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    onBlur={handleBlur('amount')}
                  />
                  {touched.amount && errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Date</label>
                  <input 
                    type="date" 
                    className={`form-control ${touched.date && errors.date ? 'is-invalid' : ''}`}
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    onBlur={handleBlur('date')}
                  />
                  {touched.date && errors.date && <div className="invalid-feedback">{errors.date}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Description</label>
                  <input 
                    type="text" 
                    className={`form-control ${touched.description && errors.description ? 'is-invalid' : ''}`} 
                    placeholder="What was this for?"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    onBlur={handleBlur('description')}
                  />
                  {touched.description && errors.description && <div className="invalid-feedback">{errors.description}</div>}
                </div>
                <button type="submit" className="btn btn-primary w-100">Add Expense</button>
              </form>
            </div>
          </div>

          <div className="card border-0 shadow-sm mt-3">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">By Category</h5>
            </div>
            <div className="card-body">
              {Object.entries(categoryTotals).map(([cat, total]) => (
                total > 0 && (
                  <div key={cat} className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <small className="fw-semibold">{cat}</small>
                      <small className="fw-bold">₹{total}</small>
                    </div>
                    <div className="progress" style={{height: '8px'}}>
                      <div 
                        className="progress-bar" 
                        style={{
                          width: `${(total/totalExpenses)*100}%`,
                          backgroundColor: getCategoryColor(cat)
                        }}
                      ></div>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
