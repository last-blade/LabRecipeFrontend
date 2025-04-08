"use client"

import { forwardRef, useState, useEffect } from "react"

const ColorPicker = forwardRef(
  ({ label, name, percentName, error = null, percentError = null, value, onChange, ...rest }, ref) => {
    const [color, setColor] = useState(value || "#6366f1") // Default indigo color

    // Update color when value changes (for controlled component)
    useEffect(() => {
      if (value && value !== color) {
        setColor(value)
      }
    }, [value])

    const handleColorChange = (e) => {
      const newColor = e.target.value
      setColor(newColor)
      if (onChange) {
        onChange({
          target: {
            name,
            value: newColor,
          },
        })
      }
    }

    return (
      <div className="mb-4">
        {label && (
          <label htmlFor={name} className="block text-sm font-medium mb-1 dark:text-gray-300">
            {label}
          </label>
        )}
        <div className="flex space-x-2">
          <div className="relative flex-shrink-0">
            <input
              ref={ref}
              type="color"
              id={name}
              name={name}
              value={color}
              onChange={handleColorChange}
              className="sr-only"
              {...rest}
            />
            <label
              htmlFor={name}
              className="block w-10 h-10 rounded-md border border-gray-300 dark:border-gray-700 cursor-pointer overflow-hidden"
              style={{ backgroundColor: color }}
            />
          </div>
          <div className="flex-grow">
            <input
              type="number"
              id={percentName}
              name={percentName}
              placeholder="Percentage (up to 5 decimals)"
              step="0.00001"
              min="0"
              max="100"
              className={`w-full rounded-md shadow-sm border ${
                percentError ? "border-red-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              } dark:border-gray-700 dark:bg-gray-800 dark:text-white px-3 py-2 transition-colors`}
            />
            {percentError && <p className="mt-1 text-sm text-red-600">{percentError}</p>}
          </div>
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    )
  },
)

export default ColorPicker

