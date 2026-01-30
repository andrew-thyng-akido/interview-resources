interface SelectProps {
  value: string | number
  onChange: (value: string) => void
  options: Array<{ value: string | number; label: string }>
  placeholder?: string
  className?: string
}

export function Select({ value, onChange, options, placeholder, className = "" }: SelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`px-3 py-2 border rounded ${className}`}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
