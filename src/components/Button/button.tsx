import React from "react";
import classnames from "classnames";

// 按钮大小
type ButtonSize = "lg" | "sm";

type ButtonType = "primary" | "default" | "danger" | "link";

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children: React.ReactNode;
  href?: string;
}

// 并集
type NativeButtonProps = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLElement>;

// Partial：typescript全局函数，将属性全部变成可选的
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button: React.FC<ButtonProps> = (props) => {
  const {
    disabled,
    size,
    btnType,
    children,
    href,
    className,
    ...resetProps
  } = props;

  const classes = classnames("lin-btn", className, {
    [`lin-btn-${btnType}`]: btnType,
    [`lin-btn-${size}`]: size,
    "lin-button-disabled": btnType === "link" && disabled,
  });
  if (btnType === "link" && href) {
    return (
      <a href={href} className={classes} {...resetProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...resetProps}>
        {children}
      </button>
    );
  }
};

Button.defaultProps = {
  disabled: false,
  btnType: "default",
};

export default Button;
