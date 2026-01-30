import { ORDER_STATUS, COFFEE_SIZES, MILK_TYPES, TEMPERATURES } from "./constants"
import type { Order } from "./types"

// Helper function to calculate total price - extracted from complex inline logic
export function calculateTotalPrice(order: Extract<Order, { status: typeof ORDER_STATUS.READY }>): number {
  let price = 0
  
  // Size pricing
  if (order.size === COFFEE_SIZES.SMALL) price += 3
  if (order.size === COFFEE_SIZES.MEDIUM) price += 4
  if (order.size === COFFEE_SIZES.LARGE) price += 5
  
  // Add-ons
  if (order.milk !== MILK_TYPES.NONE) price += 1
  if (order.sugar > 0) price += 0.5
  if (order.temperature === TEMPERATURES.ICED) price += 0.5
  
  return price
}

// Helper function to check if order is complete - extracted from complex inline logic
export function isOrderComplete(order: Extract<Order, { status: typeof ORDER_STATUS.READY }>): boolean {
  const validSizes = Object.values(COFFEE_SIZES)
  return (
    validSizes.includes(order.size) &&
    order.milk !== "" &&
    order.temperature !== "" &&
    order.selectedBeanId !== null
  )
}
