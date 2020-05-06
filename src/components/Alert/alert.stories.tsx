import React from 'react'

import {storiesOf} from '@storybook/react'

import {action} from '@storybook/addon-actions'

import Alert from './alert'

const defaultAlert = () => {
    return (
        <Alert className='width-500' onClose={action('close')} message='this is alert'/>
    )
}

const alertWithType = ()=>{
    return (
        <div className='width-500'>
            <Alert onClose={action('close')} message='this is alert' type='success' />
            <Alert onClose={action('close')} className='mt-20' message='this is alert' type='info' />
            <Alert onClose={action('close')} className='mt-20' message='this is alert' type='warning' />
            <Alert onClose={action('close')} className='mt-20' message='this is alert' type='error' />
        </div>
    )
}

const alertWithClosable= ()=>{
    return (
            <Alert className='width-500' closable={false} message='this is alert' type='success' />
    )
}

const alertWithTitle= ()=>{
    return (
            <Alert className='width-500' onClose={action('close')} message='this is alert' title='标题' type='success' />
    )
}

storiesOf('Alert 警告提示',module)
.addParameters({
    info: {
        text: `
    ## 引用方法
    ~~~js
    import {Alert} from 'lin-react-ui
    ~~~
    `
    }
})
.add('默认的 Alert',defaultAlert)
.add('不同类型的 Alert',alertWithType)
.add('不可关闭的 Alert',alertWithClosable)
.add('带有标题的 Alert',alertWithTitle)