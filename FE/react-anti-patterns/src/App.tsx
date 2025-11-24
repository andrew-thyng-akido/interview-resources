import "./index.css"
import { useState } from "react"
import CoffeeOrderForm from "./CoffeeOrderForm"

export function App() {
  const [customerName, setCustomerName] = useState("")
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (customerName.trim()) {
      setShowForm(true)
    }
  }

  if (showForm) {
    return <CoffeeOrderForm customerName={customerName} />
  }

  return (
    <div className="p-8">
      <h1>Welcome to Coffee Shop</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div>
          <label className="block mb-2">
            Enter your name:
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="block mt-1 px-3 py-2 border rounded"
              placeholder="Your name"
              required
            />
          </label>
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Start Order
        </button>
      </form>
    </div>
  )
}

export default App
