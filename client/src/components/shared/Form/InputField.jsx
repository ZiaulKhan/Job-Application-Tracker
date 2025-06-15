import React, { useState } from "react";
import { Controller } from "react-hook-form";
import "./Form.css";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const InputField = ({
  label,
  required,
  name,
  defaultValue = "",
  disabled = false,
  form,
  inputProps = {},
  isPassword = false,
  labelClassName = "",
  inputClassName = "",
  errorClassName = "",
  alignVertical = false,
  className = "",
}) => {
  const {
    control,
    formState: { errors },
  } = form;

  const [showPassword, setShowPassword] = useState(false);

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

      <div className="password-wrapper">
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => {
            const InputTag = isPassword ? "input" : "input";
            return (
              <InputTag
                {...field}
                type={isPassword && !showPassword ? "password" : "text"}
                disabled={disabled}
                id={name}
                className={`form-input ${inputClassName}`}
                {...inputProps}
              />
            );
          }}
        />
        {isPassword && (
          <span
            className="toggle-password"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
          </span>
        )}
      </div>

      {errorMessage && (
        <p className={`form-error ${errorClassName}`}>{errorMessage}</p>
      )}
    </div>
  );
};

export default InputField;
