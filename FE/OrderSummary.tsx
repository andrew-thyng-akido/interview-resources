function OrderSummary(
  size: string,
  milk: string,
  sugar: string,
  temperature: string,
  beanType: string,
  title?: string
) {
  return (
    <div>
      <h3>Order Summary</h3>
      <p>Size: {size}</p>
      <p>Milk: {milk}</p>
      <p>Sugar: {sugar}</p>
      <p>Temperature: {temperature}</p>
      <p>Bean: {beanType}</p>
    </div>
  )
}

export default OrderSummary
