import React from "react";

const Button = ({
  href = false,
  padding = "default",
  text,
  icon = null,
  onClick = () => "",
  variant = "default",
  type = "button",
  outlined = false,
  textOnly = false,
  iconOnly = false,
  className,
  ...props
}) => {
  // Handler
  const handleButtonClicked = (e) => {
    e.preventDefault();
    onClick(e);
  };

  // Helpers
  const determinePadding = () => {
    if (padding === "default") return "px-3.5 py-1";
    if (padding === "dense") return "px-1 py-0.5";
  };

  const determineSpacing = () => {
    if (padding === "default") return "space-x-2";
    if (padding === "dense") return "space-x-1";
  };

  const determineRounding = () => {
    if (padding === "default") return "rounded-md";
    if (padding === "dense") return "rounded-sm";
  };

  if (textOnly)
    return (
      <button
        onClick={(e) => handleButtonClicked(e)}
        type={type}
        className={`flex justify-center items-center py-1 space-x-1.5 ${className}`}
        {...props}
      >
        <span>{text}</span>{" "}
        {icon && (
          <span className="flex justify-center items-center">{icon}</span>
        )}
      </button>
    );

  if (iconOnly)
    switch (variant) {
      case "success":
        return (
          <button
            onClick={(e) => handleButtonClicked(e)}
            type={type}
            className={`flex justify-center items-center px-1.5 py-0.5 rounded-sm shadow-md filter hover:shadow-lg hover:brightness-125 bg-secondary-light text-whites-light ${className}`}
            {...props}
          >
            <span className="flex justify-center items-center">{icon}</span>
          </button>
        );
      case "info":
        return (
          <button
            onClick={(e) => handleButtonClicked(e)}
            type={type}
            className={`flex justify-center items-center px-1.5 py-0.5 rounded-sm shadow-md filter hover:shadow-lg hover:brightness-125 bg-info text-whites-light ${className}`}
            {...props}
          >
            <span className="flex justify-center items-center">{icon}</span>
          </button>
        );
      case "error":
        return (
          <button
            onClick={(e) => handleButtonClicked(e)}
            type={type}
            className={`flex justify-center items-center px-1.5 py-0.5 rounded-sm shadow-md filter hover:shadow-lg hover:brightness-125 bg-primary-dark text-whites-light ${className}`}
            {...props}
          >
            <span className="flex justify-center items-center">{icon}</span>
          </button>
        );
      case "warning":
        return (
          <button
            onClick={(e) => handleButtonClicked(e)}
            type={type}
            className={`flex justify-center items-center px-1.5 py-0.5 rounded-sm shadow-md filter hover:shadow-lg hover:brightness-125 bg-warning text-whites-light ${className}`}
            {...props}
          >
            <span className="flex justify-center items-center">{icon}</span>
          </button>
        );
      case "dark":
        return (
          <button
            onClick={(e) => handleButtonClicked(e)}
            type={type}
            className={`flex justify-center items-center px-1.5 py-0.5 rounded-sm shadow-md filter hover:shadow-lg hover:brightness-125 bg-blacks-dark text-whites-light ${className}`}
            {...props}
          >
            <span className="flex justify-center items-center">{icon}</span>
          </button>
        );
      case "light":
        return (
          <button
            onClick={(e) => handleButtonClicked(e)}
            type={type}
            className={`flex justify-center items-center px-1.5 py-0.5 rounded-sm shadow-md filter hover:shadow-lg hover:brightness-125 bg-grays-light text-whites-light ${className}`}
            {...props}
          >
            <span className="flex justify-center items-center">{icon}</span>
          </button>
        );
      case "none":
        return (
          <button
            onClick={(e) => handleButtonClicked(e)}
            type={type}
            className={`flex justify-center items-center px-1.5 py-0.5 ${className}`}
            {...props}
          >
            <span className="flex justify-center items-center">{icon}</span>
          </button>
        );
    }

  switch (variant) {
    case "success":
      if (outlined)
        return (
          <button
            onClick={(e) => handleButtonClicked(e)}
            type={type}
            className={`flex justify-center items-center ${determineRounding()} shadow-md filter hover:shadow-lg hover:brightness-125 ${determineSpacing()} border-2  border-secondary-light  ${className}`}
            {...props}
          >
            <span>{text}</span>{" "}
            {icon && (
              <span className="flex justify-center items-center">{icon}</span>
            )}
          </button>
        );
      return (
        <button
          onClick={(e) => handleButtonClicked(e)}
          type={type}
          className={`flex justify-center items-center ${determineRounding()} shadow-md filter hover:shadow-lg hover:brightness-125 ${determineSpacing()} bg-secondary-light text-whites-light ${className}`}
          {...props}
        >
          <span className="text-blacks-dark font-medium leading-none">
            {text}
          </span>
          {icon && (
            <span className="flex justify-center items-center text-blacks-dark">
              {icon}
            </span>
          )}
        </button>
      );

    case "warning":
      if (outlined)
        return (
          <button
            onClick={(e) => handleButtonClicked(e)}
            type={type}
            className={`flex justify-center items-center ${determinePadding()} ${determineRounding()} shadow-md filter hover:shadow-lg hover:brightness-125 ${determineSpacing()} border-2  border-warning ${className}`}
            {...props}
          >
            <span>{text}</span>{" "}
            {icon && (
              <span className="flex justify-center items-center">{icon}</span>
            )}
          </button>
        );
      return (
        <button
          onClick={(e) => handleButtonClicked(e)}
          type={type}
          className={`flex justify-center items-center ${determinePadding()} ${determineRounding()} shadow-md filter hover:shadow-lg hover:brightness-125 ${determineSpacing()} bg-warning ${className}`}
          {...props}
        >
          <span className="font-medium leading-none">{text}</span>
          {icon && (
            <span className="flex justify-center items-center">{icon}</span>
          )}
        </button>
      );

    case "error":
      if (outlined)
        return (
          <button
            onClick={(e) => handleButtonClicked(e)}
            type={type}
            className={`flex justify-center items-center ${determinePadding()} ${determineRounding()} shadow-md filter hover:shadow-lg hover:brightness-125 ${determineSpacing()} border-2  border-primary-light ${className}`}
            {...props}
          >
            <span className="font-medium leading-none text-whites-light">
              {text}
            </span>
            {icon && (
              <span className="flex justify-center items-center">{icon}</span>
            )}
          </button>
        );
      return (
        <button
          onClick={(e) => handleButtonClicked(e)}
          type={type}
          className={`flex justify-center items-center text-whites-light ${determinePadding()} ${determineRounding()} shadow-md filter hover:shadow-lg hover:brightness-125 ${determineSpacing()} bg-primary-light ${className}`}
          {...props}
        >
          <span className="">{text}</span>
          {icon && (
            <span className="flex justify-center items-center">{icon}</span>
          )}
        </button>
      );

    case "info":
      if (outlined)
        return (
          <button
            onClick={(e) => handleButtonClicked(e)}
            type={type}
            className={`flex justify-center items-center  ${determineRounding()} shadow-md filter hover:shadow-lg hover:brightness-125 ${determineSpacing()} border-2  border-info ${className}`}
            {...props}
          >
            <span className="font-medium leading-none">{text}</span>
            {icon && (
              <span className="flex justify-center items-center">{icon}</span>
            )}
          </button>
        );
      return (
        <button
          onClick={(e) => handleButtonClicked(e)}
          type={type}
          className={`flex justify-center items-center ${determineRounding()} shadow-md filter hover:shadow-lg hover:brightness-125 ${determineSpacing()} bg-info ${className}`}
          {...props}
        >
          <span className="font-medium leading-none">{text}</span>
          {icon && (
            <span className="flex justify-center items-center">{icon}</span>
          )}
        </button>
      );

    case "dark":
      if (outlined)
        return (
          <button
            onClick={(e) => handleButtonClicked(e)}
            type={type}
            className={`flex justify-center items-center ${determinePadding()} ${determineRounding()} shadow-md filter hover:shadow-lg hover:brightness-125 ${determineSpacing()} border-2  border-blacks-dark ${className}`}
            {...props}
          >
            <span className="font-medium leading-none">{text}</span>
            {icon && (
              <span className="flex justify-center items-center">{icon}</span>
            )}
          </button>
        );
      return (
        <button
          onClick={(e) => handleButtonClicked(e)}
          type={type}
          className={`flex justify-center items-center ${determinePadding()} ${determineRounding()} shadow-md filter hover:shadow-lg hover:brightness-125 ${determineSpacing()} bg-blacks-dark ${className}`}
          {...props}
        >
          <span className="font-medium leading-none">{text}</span>
          {icon && (
            <span className="flex justify-center items-center">{icon}</span>
          )}
        </button>
      );

    case "light":
      if (outlined)
        return (
          <button
            onClick={(e) => handleButtonClicked(e)}
            type={type}
            className={`flex justify-center items-center ${determinePadding()} ${determineRounding()} shadow-md filter hover:shadow-lg hover:brightness-125 ${determineSpacing()} border-2  border-grays-light ${className}`}
            {...props}
          >
            <span className="font-medium leading-none">{text}</span>
            {icon && (
              <span className="flex justify-center items-center">{icon}</span>
            )}
          </button>
        );
      return (
        <button
          onClick={(e) => handleButtonClicked(e)}
          type={type}
          className={`flex justify-center items-center ${determinePadding()} ${determineRounding()} shadow-md filter hover:shadow-lg hover:brightness-125 ${determineSpacing()} bg-grays-light ${className}`}
          {...props}
        >
          <span className="font-medium leading-none">{text}</span>
          {icon && (
            <span className="flex justify-center items-center">{icon}</span>
          )}
        </button>
      );

    default:
      break;
  }

  return (
    <button
      onClick={(e) => handleButtonClicked(e)}
      type={type}
      className={`flex justify-center items-center ${determinePadding()} ${determineRounding()} shadow-md filter hover:shadow-lg hover:brightness-125 ${determineSpacing()} bg-secondary-light  ${className}`}
      {...props}
    >
      <span className="font-medium leading-none">{text}</span>
      {icon && <span className="flex justify-center items-center">{icon}</span>}
    </button>
  );
};

export default Button;
