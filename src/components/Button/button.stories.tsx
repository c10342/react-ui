import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from './button'

const defaultButton = () => (
    <div>
        <Button onClick={action('default button')}>default button</Button>
    </div>
)

const buttonWithSize = () => (
    <div>
        <Button size='lg' btnType='primary' onClick={action('lg button')}>lg button</Button>
        <Button className='ml-20' size='sm' btnType='danger' onClick={action('sm button')}>sm button</Button>
    </div>
)


const buttonWithType = () => (
    <div>
        <Button onClick={action('danger button')} btnType='danger'>danger button</Button>
        <Button onClick={action('primary button')} className='ml-20' btnType='primary'>primary button</Button>
        <Button onClick={action('link')} className='ml-20' btnType='link' href='https://www.baidu.com/'>link</Button>
    </div>
)

const buttonWithDisabled = () => (
    <div>
        <Button onClick={action('disabled button')} btnType='danger' disabled={true}>disabled button</Button>
        <Button onClick={action('unDisabled button')} className='ml-20' btnType='primary'>unDisabled button</Button>
    </div>
)

// storiesOf('Button组件', module)
// .addDecorator(withInfo)
// .addParameters({
//     info:{
//         text:`
//         这是默认组件
//         ~~~js
//         const a = 12
//         ~~~
//         `,
//         inline:true
//     }
// })
//   .add('默认 Button', defaultButton)
//   .add('不同尺寸 Button', buttonWithSize,{info:{inline:false}})
//   .add('不同类型 Button', buttonWithType)

storiesOf('Button 按钮', module)
    .addParameters({
        info: {
            text: `
        ## 引用方法
        ~~~js
        import {Button} from 'lin-react-ui
        ~~~
        `
        }
    })
    .add('默认 Button', defaultButton)
    .add('不同尺寸 Button', buttonWithSize)
    .add('不同类型 Button', buttonWithType)
    .add('禁用的 Button',buttonWithDisabled)