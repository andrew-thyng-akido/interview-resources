import type { Bean } from "../src/index"
import { ORDER_STATUS, COFFEE_SIZES, MILK_TYPES, TEMPERATURES } from "./constants"

// Derive types from the const objects
export type OrderStatus = typeof ORDER_STATUS[keyof typeof ORDER_STATUS]
export type CoffeeSize = typeof COFFEE_SIZES[keyof typeof COFFEE_SIZES]
export type MilkType = typeof MILK_TYPES[keyof typeof MILK_TYPES]
export type Temperature = typeof TEMPERATURES[keyof typeof TEMPERATURES]

// Discriminated union for order with status as part of the object
export type Order =
  | { 
      status: typeof ORDER_STATUS.LOADING
    }
  | { 
      status: typeof ORDER_STATUS.ERROR
      message: string
    }
  | { 
      status: typeof ORDER_STATUS.READY
      size: CoffeeSize
      milk: MilkType
      sugar: number
      temperature: Temperature
      selectedBeanId: number | null
      beans: Bean[]
    }
