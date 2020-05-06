import React from 'react'

import { storiesOf } from '@storybook/react'

import { action } from '@storybook/addon-actions'

import Tabs from './tabs'
import TabItem from './tabItem'


const defaultTabs = () => {
    return (
        <Tabs
        className='width-500'
            defaultIndex={0}
            onSelect={action('select')}
            type="line"
        >
            <TabItem label="选项卡一">
                this is content one
            </TabItem>
            <TabItem label="选项卡二">
                this is content two
            </TabItem>
            <TabItem label="用户管理">
                this is content three
            </TabItem>
        </Tabs>
    )
}

const tabsWithType = () => {
    return (
        <Tabs
        className='width-500'
            defaultIndex={0}
            onSelect={action('select')}
            type='card'
        >
            <TabItem label="选项卡一">
                this is content one
            </TabItem>
            <TabItem label="选项卡二">
                this is content two
            </TabItem>
            <TabItem label="用户管理">
                this is content three
            </TabItem>
        </Tabs>
    )
}

const MyLabel = () => {
    return (
        <div>自定义Label</div>
    )
}
const tabsWithLabel = () => {
    return (
        <Tabs
        className='width-500'
            defaultIndex={0}
            onSelect={action('select')}
            type='card'
        >
            <TabItem label={<MyLabel />}>
                this is content one
            </TabItem>
            <TabItem label="选项卡二">
                this is content two
            </TabItem>
            <TabItem label="用户管理">
                this is content three
            </TabItem>
        </Tabs>
    )
}



storiesOf('Tabs 标签页', module)
    .addParameters({
        info: {
            text: `
            ## 引用方法
            ~~~js
            import {Tabs} from 'lin-react-ui
            const TabItem = Tabs.TabItem
            ~~~
            `
        }
    })
    .add('默认的 Tabs', defaultTabs)
    .add('选项卡样式的 Tabs', tabsWithType)
    .add('自定义选项卡的 Tabs', tabsWithLabel)