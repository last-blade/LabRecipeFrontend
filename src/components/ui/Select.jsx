import { forwardRef } from "react"
import { ChevronDown } from "lucide-react"

const Select = forwardRef(
  ({ label, name, options = [], placeholder = "Select an option", error = null, icon: Icon = null, ...rest }, ref) => {
    return (
      <div className="mb-4">
        {label && (
          <label htmlFor={name} className="block text-sm font-medium mb-1 dark:text-gray-300">
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon size={18} className="text-gray-500" />
            </div>
          )}
          <select
            ref={ref}
            id={name}
            name={name}
            className={`w-full rounded-md shadow-sm border appearance-none ${
              error
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            } dark:border-gray-700 dark:bg-gray-800 dark:text-white ${
              Icon ? "pl-10" : "pl-3"
            } pr-10 py-2 transition-colors`}
            {...rest}
          >
            <option value="">{placeholder}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDown size={18} className="text-gray-500" />
          </div>
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    )
  },
)

export default Select

