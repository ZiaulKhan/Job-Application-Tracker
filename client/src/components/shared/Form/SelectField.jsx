import React from "react";
import { Controller } from "react-hook-form";
import "./Form.css";

const SelectField = ({
  label,
  required,
  name,
  defaultValue = "",
  disabled = false,
  form,
  selectProps = {},
  labelClassName = "",
  selectClassName = "",
  errorClassName = "",
  alignVertical = false,
  className = "",
  options = [],
}) => {
  const {
    control,
    formState: { errors },
  } = form;

  const errorMessage = errors?.[name]?.message;

  return (
    <div
      className={`form-item ${alignVertical ? "flex-col" : ""} ${className}`}
    >
      {label && (
        <label htmlFor={name} className={`form-label ${labelClassName}`}>
          {label} {required && "*"}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <select
            {...field}
            id={name}
            disabled={disabled}
            className={`form-input ${selectClassName}`}
            {...selectProps}
          >
            <option value="">-- Select --</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )}
      />

      {errorMessage && (
        <p className={`form-error ${errorClassName}`}>{errorMessage}</p>
      )}
    </div>
  );
};

export default SelectField;
