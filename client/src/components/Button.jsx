import React from 'react'

function Button({label, onClick, variant}) {
const baseStyles = "w-30 py-2.5 sm:py-3 rounded-lg font-extrabold tracking-wide shadow-lg transition text-sm sm:text-base";

const variants = {
  primary: "bg-amber-600 hover:bg-amber-700 text-white",
  secondary: "bg-gray-600 hover:bg-gray-700 text-white",
  tertiary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
  link: "bg-transparent text-amber-600 hover:text-amber-700 underline",
  danger: "bg-red-600 hover:bg-red-700 text-white",

};

  return (
    <button
            type="button"
            onClick={onClick}
            className={`${baseStyles} ${variants[variant] || variants.primary}`}
          >{label}
          </button>
  )
}

export default Button