import { useEffect, useState } from "react";
import { Field, FastField, useField, useFormikContext } from "formik";

const InputPassword = ({
  size = "full",
  bg = "bg-dark-background",
  noLabel = true,
  label,
  secondaryLabel,
  className,
  type = "password",
  forget = false,
  onForgetClick = () => null,
  ...props
}) => {
  const [field, meta] = useField(props);

  const [viewPassword, setViewPassword] = useState(false);

  if (size === "large")
    return (
      <div
        className={`relative flex flex-col text-whites-light space-y-1 ${className}`}
      >
        <div className={`relative max-w-min ${forget && "mb-3.5"}`}>
          <Field
            className={`${bg} w-52 text-xs  focus:ring-transparent rounded-lg   focus:ring-offset-transparent-dark border-transparent  focus:border-opacity-60  focus:border-dark-backgroundDarker placeholder-whites-dark placeholder-opacity-20 xl:w-60`}
            type={viewPassword ? "text" : "password"}
            autoComplete="current-password"
            id="current-password"
            {...field}
            {...props}
          />
          <div
            onClick={() => setViewPassword((v) => !v)}
            className="p-0.5 absolute top-1/2 transform -translate-y-1/2 right-1.5 text-whites-dark"
          >
            {viewPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                  clipRule="evenodd"
                />
                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
              </svg>
            )}
          </div>
          {forget && (
            <div
              onClick={onForgetClick}
              className="absolute cursor-pointer text-3xs text-whites-dark self-end right-0.5 top-full transform translate-y-1"
            >
              Forgot password?
            </div>
          )}
        </div>
        {meta.touched && meta.error ? (
          <div className="text-2xs pl-1 text-primary-dark">{meta.error}</div>
        ) : null}
      </div>
    );
  if (size === "medium")
    return (
      <div className={`flex flex-col text-whites-light space-y-1 ${className}`}>
        <div className="relative">
          <Field
            className={`${bg} w-36 text-xs  focus:ring-transparent rounded-lg   focus:ring-offset-transparent-dark border-transparent  focus:border-opacity-60  focus:border-dark-backgroundDarker placeholder-whites-dark placeholder-opacity-20`}
            type={viewPassword ? "text" : "password"}
            {...field}
            {...props}
          />
          <div
            onClick={() => setViewPassword((v) => !v)}
            className="p-0.5 absolute top-1/2 transform -translate-y-1/2 right-1.5 text-whites-dark"
          >
            {viewPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                  clipRule="evenodd"
                />
                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
              </svg>
            )}
          </div>
        </div>
        {meta.touched && meta.error ? (
          <div className="text-2xs pl-1 text-primary-dark">{meta.error}</div>
        ) : null}
      </div>
    );
};

export default InputPassword;
