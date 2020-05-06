import React, { useState } from 'react'

import { storiesOf } from '@storybook/react'

import Transition from './transition'

import Button from '../Button/button'


const DefaultTransition = () => {
    const [top, setTop] = useState(true)
    const [left, setLeft] = useState(true)
    const [right, setRight] = useState(true)
    const [bottom, setBottom] = useState(true)
    return (
        <div>
            <div>
                <Button btnType='primary' onClick={() => { setTop(!top) }}>zoom-in-top</Button>
                <Button className='ml-20' btnType='primary' onClick={() => { setLeft(!left) }}>zoom-in-left</Button>
                <Button className='ml-20' btnType='primary' onClick={() => { setRight(!right) }}>zoom-in-right</Button>
                <Button className='ml-20' btnType='primary' onClick={() => { setBottom(!bottom) }}>zoom-in-bottom</Button>
            </div>
            <Transition in={top} timeout={500} animation='zoom-in-top'>
                <div className='mt-20'>zoom-in-top</div>
            </Transition>
            <Transition in={left} timeout={500} animation='zoom-in-left'>
                <div className='mt-20'>zoom-in-left</div>
            </Transition>
            <Transition in={right} timeout={500} animation='zoom-in-right'>
                <div className='mt-20'>zoom-in-right</div>
            </Transition>
            <Transition in={bottom} timeout={500} animation='zoom-in-bottom'>
                <div className='mt-20'>zoom-in-bottom</div>
            </Transition>
        </div>
    )
}

const OtherTransition = () => {
    const [show, setShow] = useState(true)
    return (
        <div>
            <Button btnType='primary' onClick={() => { setShow(!show) }}>toggle</Button>
            <Transition in={show} timeout={500} classNames='fade'>
                <div className='mt-20'>自定义动画</div>
            </Transition>
            <style>
                {
                 `
                 .fade-enter {
                    opacity: 0;
                }
                .fade-enter-active {
                    opacity: 1;
                    transition: all .3s;
                }
                .fade-exit {
                    opacity: 1;
                }
                .fade-exit-active {
                    opacity: 0;
                    transition: all .3s;
                }
                 `
                }
            </style>
        </div>
    )
}


storiesOf('Transition 动画', module)
    .addParameters({
        info: {
            text: `
            ## 引用方法
            ~~~js
            import {Transition} from 'lin-react-ui
            ~~~
            `
        }
    })
    .add('内置动画效果的 Transition', DefaultTransition)
    .add('自定义动画的 Transition', OtherTransition, {
        info: {
            text: `
            ## 引用方法
            ~~~js
            import {Transition} from 'lin-react-ui
            ~~~
            详情可参考:https://reactcommunity.org/react-transition-group/css-transition
            `
        }
    })