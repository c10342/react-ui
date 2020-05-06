import React from 'react'

import { storiesOf } from '@storybook/react'

import { action } from '@storybook/addon-actions'

import Input from './input'

const defaultInput = () => {
    return (
        <Input
        className='width-500'
            onChange={action('change')}
            placeholder="请输入"
        />
    )
}

const inputWithDisabled = () => {
    return (
        <Input
        className='width-500'
            onChange={action('change')}
            placeholder="请输入"
            disabled />
    )
}

const inputWithIcon = () => {
    return (
        <Input
        className='width-500'
            icon="search"
            placeholder="带图标的输入框"
        />
    )
}

const inputWithSize = () => {
    return (
        <div className='width-500'>
            <Input
                defaultValue="large size"
                size="lg"
            />
            <Input
                className='mt-20'
                placeholder="small size"
                size="sm"
            />
        </div>
    )
}

const inputWithPend = () => {
    return (
        <div>
            <Input
                defaultValue="prepend text"
                prepend="https://"
            />
            <Input
                className='mt-20'
                append=".com"
                defaultValue="append text"
            />
        </div>
    )
}


storiesOf('Input 输入框', module)
    .addParameters({
        info: {
            text: `
            ## 引用方法
            ~~~js
            import {Input} from 'lin-react-ui
            ~~~
            `
        }
    })
    .add('默认的 Input', defaultInput)
    .add('被禁用的 Input', inputWithDisabled)
    .add('带图标的input', inputWithIcon)
    .add('大小不同的 Input', inputWithSize)
    .add('带前后缀的 Input', inputWithPend)