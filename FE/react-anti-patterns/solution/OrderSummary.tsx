interface OrderSummaryProps {
  size: string
  milk: string
  sugar: number
  temperature: string
  beanType: string
}

export function OrderSummary({ size, milk, sugar, temperature, beanType }: OrderSummaryProps) {
  return (
    <div className="mt-6 p-4 bg-gray-100 rounded">
      <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
      <div className="space-y-1">
        <p><strong>Size:</strong> {size}</p>
        <p><strong>Milk:</strong> {milk}</p>
        <p><strong>Sugar:</strong> {sugar} teaspoon{sugar !== 1 ? 's' : ''}</p>
        <p><strong>Temperature:</strong> {temperature}</p>
        <p><strong>Bean:</strong> {beanType}</p>
      </div>
    </div>
  )
}
