import React from 'react'

import { storiesOf } from '@storybook/react'

import Icon from './icon'



const defaultIcon = () => {
    return (
        <div>
            <Icon
                icon="check"
                size="3x"
            />
            <Icon
                icon="times"
                size="3x"
                className='ml-20'
            />
            <Icon
                icon="anchor"
                size="3x"
                className='ml-20'
            />
            <Icon
                icon="trash"
                size="3x"
                className='ml-20'
            />
        </div>
    )
}

const iconWithTheme = () => {
    return (
        <div>
            <Icon
                icon="check"
                size="3x"
                theme="success"
            />
            <Icon
                icon="times"
                size="3x"
                theme="danger"
                className='ml-20'
            />
            <Icon
                icon="anchor"
                size="3x"
                theme="primary"
                className='ml-20'
            />
            <Icon
                icon="exclamation-circle"
                size="3x"
                theme="warning"
                className='ml-20'
            />
        </div>
    )
}

const iconWithOther = () => {
    return (
        <div>
            <Icon
                icon="spinner"
                size="3x"
                spin
                theme="primary"
            />
            <Icon
                icon="spinner"
                pulse
                size="3x"
                theme="success"
                className='ml-20'
            />
        </div>
    )
}


storiesOf('Icon 组件', module)
    .addParameters({
        info: {
            text: `
            ## 引用方法
            ~~~js
            import {Icon} from 'lin-react-ui
            ~~~
            `
        }
    })
    .add('默认的 Icon', defaultIcon)
    .add('不同主题的 Icon', iconWithTheme)
    .add('更多行为的 Icon', iconWithOther,{
        info: {
            text: `
            ## 引用方法
            ~~~js
            import {Icon} from 'lin-react-ui
            ~~~
            更多例子请参见：https://github.com/FortAwesome/react-fontawesome#basic
            `
        }
    })