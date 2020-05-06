import React, { useCallback, useState,FC } from "react";
import classnames from "classnames";
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'

type AlertType = "success" | "info" | "warning" | "error";

export interface AlertProps {
  /** 描述 */
  message: string;
  /** 类型 四种可选 针对四种不同的场景 */
  type?: AlertType;
  /** 是否显示关闭图标 */
  closable?: boolean;
  /** 关闭alert时触发的事件 */
  onClose?: Function;
  /** 标题 */
  title?: string;
  /** 自定义类名 */
  className?:string
}

export const Alert: FC<AlertProps> = (props) => {
  const { message, type, closable, onClose, title,className } = props;
  const classes = classnames("lin-alert", className,{
    [`lin-alert-${type}`]: type,
  });
  const OnClose = useCallback(() => {
    setShow(false);
    if (onClose) {
      onClose();
    }
  }, [onClose]);
  const [show, setShow] = useState(true);
  return (
    <Transition in={show} animation='zoom-in-top' timeout={200}>
      <div className={classes} data-testid="alert">
        {title ? <h6 className="lin-alert-title">{title}</h6> : null}
        <p className="lin-alert-message">{message}</p>
        {closable ? (
          <span
            className="lin-alert-close"
            onClick={OnClose}
            data-testid="close"
          >
          <Icon icon='times' />
          </span>
        ) : null}
      </div>
    </Transition>
  )
};

Alert.defaultProps = {
  type: "success",
  closable: true,
};

export default Alert;
