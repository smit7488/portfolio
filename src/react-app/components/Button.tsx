import React from "react";
import classNames from "classnames";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline-primary" | "outline-secondary";
};

const Button: React.FC<ButtonProps> = ({ variant = "primary", className, ...props }) => {
  const btnClass = classNames("custom-btn", className, {
    "custom-btn-primary": variant === "primary",
    "custom-btn-secondary": variant === "secondary",
    "custom-btn-outline-primary": variant === "outline-primary",
    "custom-btn-outline-secondary": variant === "outline-secondary",
  });

  return <button className={btnClass} {...props} />;
};

export default Button;
