import { useState, useEffect } from "react"
import type { Bean } from "./index"
import OrderSummary from "./OrderSummary"

interface CoffeeOrderFormProps {
  customerName: string
}

export function CoffeeOrderForm({ customerName }: CoffeeOrderFormProps) {
  const [size, setSize] = useState("medium")
  const [milk, setMilk] = useState("whole")
  const [sugar, setSugar] = useState(0)
  const [temperature, setTemperature] = useState("hot")

  const [orderReady, setOrderReady] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)

  const [beans, setBeans] = useState<Bean[]>([])
  const [selectedBean, setSelectedBean] = useState<Bean | null>(null) // BAD: Should just be ID
  const [isLoadingBeans, setIsLoadingBeans] = useState(true)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [formSubmitted, setFormSubmitted] = useState(false)
  const [clickCount, setClickCount] = useState(0)

  const [currentCustomer, setCurrentCustomer] = useState(customerName)

  useEffect(() => {
    if (customerName !== currentCustomer) {
      setSize("medium")
      setMilk("whole")
      setSugar(0)
      setTemperature("hot")
      setSelectedBean(null)
      setBeanName("")
      setFormSubmitted(false)
      setClickCount(0)
      setOrderReady(false)
      setTotalPrice(0)
      setCurrentCustomer(customerName)
    }
  }, [customerName, currentCustomer])

  useEffect(() => {
    if (size && milk && temperature && selectedBean) {
      setOrderReady(true)
    } else {
      setOrderReady(false)
    }
  }, [size, milk, temperature])

  useEffect(() => {
    let price = 0
    if (size === "small") price += 3
    if (size === "medium") price += 4
    if (size === "large") price += 5
    if (milk !== "none") price += 1
    if (sugar > 0) price += 0.5
    if (temperature === "iced") price += 0.5
    setTotalPrice(price)
  }, [size, milk, sugar, temperature])

  useEffect(() => {
    setIsLoadingBeans(true)
    setLoading(true)

    fetch("/api/beans")
      .then(res => res.json())
      .then(data => {
        setBeans(data.beans)
        setIsLoadingBeans(false)
      })
      .catch(err => {
        setError("Failed to load beans")
        setIsLoadingBeans(false)
      })

    setTimeout(() => {
      setLoading(false)
    }, 300)
  }, [])

  useEffect(() => {
    if (selectedBean) {
      setBeanName(selectedBean.name)
    }
  }, [selectedBean])

  const handleSizeChange = (newSize: string) => {
    setSize(newSize)
  }

  const [beanName, setBeanName] = useState("")

  const handleSubmit = () => {
    setFormSubmitted(true)
    setClickCount(clickCount + 1)
    alert(`Order placed for ${customerName}! Total: $${totalPrice.toFixed(2)}`)
  }

  const canSubmit = size !== ""
    && milk !== ""
    && temperature !== ""
    && selectedBean !== null
    && !loading
    && !isLoadingBeans
    && beans.length > 0
    && (size === "small" || size === "medium" || size === "large")

  if (loading || isLoadingBeans) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="p-8">
      <h1>Coffee Order Form</h1>
      <p className="text-lg mb-4">Ordering for: <strong>{customerName}</strong></p>

      <div>
        <h2>Select Your Coffee</h2>
        <p>Choose your preferences below</p>
      </div>

      <div>
        <h2>Select Your Coffee</h2>
        <p>Customize your order</p>
      </div>

      <div>
        <label>
          Size:
          <select value={size} onChange={(e) => handleSizeChange(e.target.value)}>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Milk:
          <select value={milk} onChange={(e) => setMilk(e.target.value)}>
            <option value="none">None</option>
            <option value="whole">Whole</option>
            <option value="skim">Skim</option>
            <option value="oat">Oat</option>
            <option value="almond">Almond</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Sugar (teaspoons):
          <input
            type="number"
            value={sugar}
            onChange={(e) => setSugar(parseInt(e.target.value) || 0)}
            min="0"
            max="5"
          />
        </label>
      </div>

      <div>
        <label>
          Temperature:
          <select value={temperature} onChange={(e) => setTemperature(e.target.value)}>
            <option value="hot">Hot</option>
            <option value="iced">Iced</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Bean Type:
          <select value={selectedBean?.id || ""} onChange={(e) => {
            const bean = beans.find((b: any) => b.id.toString() === e.target.value)
            setSelectedBean(bean || null)
          }}>
            <option value="">Select a bean</option>
            {beans.map((bean: any) => (
              <option key={bean.id} value={bean.id}>
                {bean.name} - {bean.roast} (${bean.price})
              </option>
            ))}
          </select>
        </label>
      </div>

      {selectedBean && (
        <div>
          <p>Bean: {beanName}</p>
          <p>Price per bag: ${selectedBean.price}</p>
          <p>Available: {selectedBean.amountAvailable} bags</p>
        </div>
      )}

      <div>
        <p>Price: ${totalPrice.toFixed(2)}</p>
        <p>Order Status: {orderReady ? "Ready" : "Not Ready"}</p>
      </div>

      <OrderSummary
        size={size}
        milk={milk}
        sugar={sugar}
        temperature={temperature}
        beanType={beanName}
      />

      <button
        onClick={handleSubmit}
        disabled={!canSubmit}
      >
        {canSubmit ? "Place Order" : "Please complete all fields"}
      </button>

      {formSubmitted && <p>Thanks for ordering! (Order #{clickCount})</p>}
    </div>
  )
}

export default CoffeeOrderForm
