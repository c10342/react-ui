import React, { ReactElement, InputHTMLAttributes, FC, ChangeEvent } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import classnames from 'classnames'

import Icon from '../Icon/icon'

type InputSize = 'lg' | 'sm'

// 因为InputHTMLAttributes中有size这个属性,造成冲突可以使用Omit忽略调InputHTMLAttributes中的size
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    /** 是否禁用input */
    disabled?: boolean
    /** 设置 input 大小，支持 lg 或者是 sm */
    size?: InputSize
    /** 添加图标，在右侧悬浮添加一个图标，用于提示 */
    icon?: IconProp
    /** 添加前缀 用于配置一些固定组合 */
    prepend?: string | ReactElement
    /** 添加后缀 用于配置一些固定组合 */
    append?: string | ReactElement
    /** input输入发生变化触发的回调 */
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    /** 可扩展的类名 */
    className?:string
}

const fixValue = (value:any)=>{
    if(typeof value === 'undefined' || value === null){
        return ''
    }
    return value
}

export const Input: FC<InputProps> = (props) => {
    const { disabled, size, icon, prepend, append, style,className, ...restProps } = props
    const classes = classnames('lin-input-wrapper', className,{
        [`lin-input-size-${size}`]: size,
        'lin-input-group': prepend || append
    })
    // 防止value和defaultValue同时出现
    if('value' in props){
        delete props.defaultValue
        restProps.value = fixValue(props.value)
    }
    return (
        <div className={classes} style={style}>
      {prepend && <div className="lin-input-group-prepend">{prepend}</div>}
      {icon && <div className="lin-icon-wrapper"><Icon icon={icon} title={`title-${icon}`}/></div>}
      <input 
        className="lin-input-inner"
        disabled={disabled}
        {...restProps}
      />
      {append && <div className="lin-input-group-append">{append}</div>}
    </div>
    )
}


export default Input;