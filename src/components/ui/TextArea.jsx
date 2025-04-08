import { forwardRef } from "react"

const TextArea = forwardRef(({ label, name, placeholder = "", rows = 4, error = null, ...rest }, ref) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium mb-1 dark:text-gray-300">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={name}
        name={name}
        rows={rows}
        placeholder={placeholder}
        className={`w-full rounded-md shadow-sm border ${
          error
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
        } dark:border-gray-700 dark:bg-gray-800 dark:text-white p-3 transition-colors`}
        {...rest}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
})

export default TextArea

