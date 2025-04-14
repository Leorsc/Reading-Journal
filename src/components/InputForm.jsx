import React from 'react';

export default function InputForm({ children, title, name, errors, }) {

  const inputWithId = React.cloneElement(children, { id: name });

  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        className="text-sm font-semibold text-label-form"
        htmlFor={name}>
        {title}
      </label>
      <div className={`w-full h-11 p-2.5 rounded-lg border border-solid ${errors ? 'border-error-message' : ' border-border-input'}`}>
        {inputWithId}
      </div>
      {errors && (
        <span className="text-xs text-error-message">{errors.message}</span>
      )}
    </div>
  )
}
