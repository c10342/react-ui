import React from 'react'

import { storiesOf } from '@storybook/react'

import { action } from '@storybook/addon-actions'

import Menu from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'


const defaultMenu = () => {
    return (
        <Menu
        className='width-500'
            defaultIndex="0"
            mode="horizontal"
            onSelect={action(`selected!`)}
        >
            <MenuItem>
                cool link
            </MenuItem>
            <MenuItem>
                cool link 2
            </MenuItem>
            <MenuItem disabled>
                disabled
            </MenuItem>
            <SubMenu title="下拉选项">
                <MenuItem>
                    下拉选项一
            </MenuItem>
                <MenuItem>
                    下拉选项二
            </MenuItem>
            </SubMenu>
        </Menu>
    )
}

const menuWithMode = () => {
    return (
        <Menu
        className='width-500'
            defaultIndex="0"
            mode="vertical"
            onSelect={action(`selected!`)}
        >
            <MenuItem>
                cool link
            </MenuItem>
            <MenuItem>
                cool link 2
            </MenuItem>
            <SubMenu title="点击下拉选项">
                <MenuItem>
                    下拉选项一
                </MenuItem>
                <MenuItem>
                    下拉选项二
                </MenuItem>
            </SubMenu>
        </Menu>
    )
}

const menuWithOpen = () => {
    return (
        <Menu
        className='width-500'
            defaultIndex="0"
            defaultOpenMenu={[
                '2'
            ]}
            mode="vertical"
            onSelect={action(`selected!`)}
        >
            <MenuItem>
                cool link
            </MenuItem>
            <MenuItem>
                cool link 2
            </MenuItem>
            <SubMenu title="默认展开下拉选项">
                <MenuItem>
                    下拉选项一
                </MenuItem>
                <MenuItem>
                    下拉选项二
                </MenuItem>
            </SubMenu>
        </Menu>
    )
}



storiesOf('Menu 导航菜单', module)
    .addParameters({
        info: {
            text: `
            ## 引用方法
            ~~~js
            import {Menu} from 'lin-react-ui
            const MenuItem = Menu.MenuItem
            const SubMenu = Menu.SubMenu
            ~~~
            `
        }
    })
    .add('默认的 Menu', defaultMenu)
    .add('纵向的 Menu', menuWithMode)
    .add('纵向默认展开的 Menu', menuWithOpen)