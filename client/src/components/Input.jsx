import React from 'react';

function Input({ label, name, value, onChange, type = "text", placeholder = "" }) {
  const inputId = `input-${name}`;

  return (
    <div className="text-white font-semibold">
      <label htmlFor={inputId}>{label}</label>
      <input
        type={type}
        id={inputId}
        name={name}
        placeholder={placeholder}
        className="w-full px-3 py-2 sm:px-4 sm:py-2 rounded-lg bg-gray-900 border border-gray-700 text-[#fff] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition text-sm sm:text-base"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default Input;
