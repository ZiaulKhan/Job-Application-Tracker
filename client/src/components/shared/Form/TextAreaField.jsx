import React from "react";
import { Controller } from "react-hook-form";
import "./Form.css";

const TextAreaField = ({
  label,
  required,
  name,
  defaultValue = "",
  disabled = false,
  form,
  textareaProps = {},
  labelClassName = "",
  textareaClassName = "",
  errorClassName = "",
  alignVertical = false,
  className = "",
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
          <textarea
            {...field}
            id={name}
            disabled={disabled}
            className={`form-input ${textareaClassName}`}
            {...textareaProps}
          />
        )}
      />

      {errorMessage && (
        <p className={`form-error ${errorClassName}`}>{errorMessage}</p>
      )}
    </div>
  );
};

export default TextAreaField;
