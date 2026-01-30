import { useState, useEffect } from "react"
import { OrderSummary } from "./OrderSummary"
import { FormField } from "./FormField"
import { Select } from "./Select"
import { ORDER_STATUS, COFFEE_SIZES, MILK_TYPES, TEMPERATURES } from "./constants"
import type { Order, CoffeeSize, MilkType, Temperature } from "./types"
import { calculateTotalPrice, isOrderComplete } from "./orderUtils"
import { SIZE_OPTIONS, MILK_OPTIONS, TEMPERATURE_OPTIONS } from "./selectOptions"

interface CoffeeOrderFormProps {
  customerName: string
}

export function CoffeeOrderForm({ customerName }: CoffeeOrderFormProps) {
  // Order state as discriminated union with status as part of object
  const [order, setOrder] = useState<Order>({ status: ORDER_STATUS.LOADING })

  // Fetch beans on mount
  useEffect(() => {
    setOrder({ status: ORDER_STATUS.LOADING })
    
    fetch("/api/beans")
      .then(res => res.json())
      .then(data => {
        setOrder({ 
          status: ORDER_STATUS.READY,
          size: COFFEE_SIZES.MEDIUM,
          milk: MILK_TYPES.WHOLE,
          sugar: 0,
          temperature: TEMPERATURES.HOT,
          selectedBeanId: null,
          beans: data.beans
        })
      })
      .catch(() => {
        setOrder({ status: ORDER_STATUS.ERROR, message: "Failed to load beans" })
      })
  }, [])

  const handleSubmit = () => {
    if (order.status === ORDER_STATUS.READY) {
      const totalPrice = calculateTotalPrice(order)
      alert(`Order placed for ${customerName}! Total: $${totalPrice.toFixed(2)}`)
    }
  }

  if (order.status === ORDER_STATUS.LOADING) {
    return <div className="p-8">Loading...</div>
  }

  if (order.status === ORDER_STATUS.ERROR) {
    return <div className="p-8">Error: {order.message}</div>
  }

  // TypeScript knows order.status is "ready" here
  const selectedBean = order.beans.find(bean => bean.id === order.selectedBeanId)
  const totalPrice = calculateTotalPrice(order)
  const orderReady = isOrderComplete(order)
  const canSubmit = orderReady

  // Helper to update order properties while maintaining the discriminated union structure
  const updateOrder = (updates: Partial<Omit<Extract<Order, { status: typeof ORDER_STATUS.READY }>, 'status'>>) => {
    if (order.status === ORDER_STATUS.READY) {
      setOrder({ 
        ...order,
        ...updates
      })
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">Coffee Order Form</h1>
      <p className="text-lg mb-6">Ordering for: <strong>{customerName}</strong></p>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Customize Your Order</h2>

        <FormField label="Size">
          <Select
            value={order.size}
            onChange={(size) => updateOrder({ size: size as CoffeeSize })}
            options={SIZE_OPTIONS}
          />
        </FormField>

        <FormField label="Milk">
          <Select
            value={order.milk}
            onChange={(milk) => updateOrder({ milk: milk as MilkType })}
            options={MILK_OPTIONS}
          />
        </FormField>

        <FormField label="Sugar (teaspoons)">
          <input
            type="number"
            value={order.sugar}
            onChange={(e) => updateOrder({ sugar: parseInt(e.target.value, 10) || 0 })}
            min="0"
            max="5"
            className="px-3 py-2 border rounded"
          />
        </FormField>

        <FormField label="Temperature">
          <Select
            value={order.temperature}
            onChange={(temperature) => updateOrder({ temperature: temperature as Temperature })}
            options={TEMPERATURE_OPTIONS}
          />
        </FormField>

        <FormField label="Bean Type">
          <Select
            value={order.selectedBeanId || ""}
            onChange={(value) => updateOrder({ selectedBeanId: value ? parseInt(value, 10) : null })}
            options={order.beans.map(bean => ({
              value: bean.id,
              label: `${bean.name} - ${bean.roast} ($${bean.price})`,
            }))}
            placeholder="Select a bean"
          />
        </FormField>

        {selectedBean && (
          <div className="mt-4 p-4 bg-blue-50 rounded">
            <h4 className="font-semibold mb-2">{selectedBean.name}</h4>
            <p className="text-sm">Price per bag: ${selectedBean.price}</p>
            <p className="text-sm">Available: {selectedBean.amountAvailable} bags</p>
            <p className="text-sm">Origin: {selectedBean.origin}</p>
            <p className="text-sm text-gray-600">{selectedBean.notes}</p>
          </div>
        )}
      </div>

      <div className="mb-6">
        <p className="text-xl font-semibold">Total Price: ${totalPrice.toFixed(2)}</p>
        <p className="text-sm text-gray-600">
          Order Status: <span className={orderReady ? "text-green-600" : "text-orange-600"}>
            {orderReady ? "Ready" : "Not Ready"}
          </span>
        </p>
      </div>

      <OrderSummary
        size={order.size}
        milk={order.milk}
        sugar={order.sugar}
        temperature={order.temperature}
        beanType={selectedBean?.name || "None"}
      />

      <button
        onClick={handleSubmit}
        disabled={!canSubmit}
        className={`mt-6 px-6 py-3 rounded font-semibold ${
          canSubmit
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {canSubmit ? "Place Order" : "Please complete all fields"}
      </button>
    </div>
  )
}
