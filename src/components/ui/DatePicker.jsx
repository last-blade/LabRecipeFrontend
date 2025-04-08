"use client"

import { forwardRef } from "react"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Calendar } from "lucide-react"

const DatePicker = forwardRef(({ label, name, selected, onChange, error = null, ...rest }, ref) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium mb-1 dark:text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Calendar size={18} className="text-gray-500" />
        </div>
        <ReactDatePicker
          ref={ref}
          id={name}
          name={name}
          selected={selected}
          onChange={onChange}
          className={`w-full rounded-md shadow-sm border ${
            error ? "border-red-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          } dark:border-gray-700 dark:bg-gray-800 dark:text-white pl-10 py-2 transition-colors`}
          dateFormat="yyyy-MM-dd"
          {...rest}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
})

export default DatePicker

