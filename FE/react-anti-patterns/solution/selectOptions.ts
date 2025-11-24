import { COFFEE_SIZES, MILK_TYPES, TEMPERATURES } from "./constants"

// Select option type
export interface SelectOption {
  value: string | number
  label: string
}

// Size select options
export const SIZE_OPTIONS: SelectOption[] = [
  { value: COFFEE_SIZES.SMALL, label: "Small ($3)" },
  { value: COFFEE_SIZES.MEDIUM, label: "Medium ($4)" },
  { value: COFFEE_SIZES.LARGE, label: "Large ($5)" },
]

// Milk type select options
export const MILK_OPTIONS: SelectOption[] = [
  { value: MILK_TYPES.NONE, label: "None" },
  { value: MILK_TYPES.WHOLE, label: "Whole" },
  { value: MILK_TYPES.SKIM, label: "Skim" },
  { value: MILK_TYPES.OAT, label: "Oat" },
  { value: MILK_TYPES.ALMOND, label: "Almond" },
]

// Temperature select options
export const TEMPERATURE_OPTIONS: SelectOption[] = [
  { value: TEMPERATURES.HOT, label: "Hot" },
  { value: TEMPERATURES.ICED, label: "Iced (+$0.50)" },
]
