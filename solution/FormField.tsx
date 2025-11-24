interface FormFieldProps {
  label: string
  children: React.ReactNode
}

export function FormField({ label, children }: FormFieldProps) {
  return (
    <div className="mb-4">
      <label className="block">
        <span className="block mb-1 font-medium">{label}:</span>
        {children}
      </label>
    </div>
  )
}
