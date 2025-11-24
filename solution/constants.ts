// Status constants for reusability
export const ORDER_STATUS = {
  LOADING: "loading",
  ERROR: "error",
  READY: "ready",
} as const

// Coffee size constants
export const COFFEE_SIZES = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
} as const

// Milk type constants
export const MILK_TYPES = {
  NONE: "none",
  WHOLE: "whole",
  SKIM: "skim",
  OAT: "oat",
  ALMOND: "almond",
} as const

// Temperature constants
export const TEMPERATURES = {
  HOT: "hot",
  ICED: "iced",
} as const
