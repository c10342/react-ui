import React,{FC} from 'react'

import {CSSTransition} from 'react-transition-group'

import {CSSTransitionProps} from 'react-transition-group/CSSTransition'

type AnimationName = 'zoom-in-top' | 'zoom-in-bottom' |'zoom-in-left' |'zoom-in-right'  

type TransitionProps = CSSTransitionProps & {
    animation?:AnimationName
    wrapper?:boolean
}

export const Transition:FC<TransitionProps>=(props)=>{
    const {children,animation,classNames,wrapper,...restProps} = props
    return (
        /**
      unmountOnExit：根据menuOpen，false时动画结束后自行移除节点，true时添加节点
      classNames：*-enter，*-enter-active，*-exit，*-exit-active
      timeout：动画时长
      */
        <CSSTransition classNames={classNames?classNames:animation} {...restProps}>
            {
                wrapper?<div>{children}</div>:children
            }
        </CSSTransition>
    )
}
Transition.defaultProps={
    unmountOnExit:true,
    appear:true
}
export default Transition;