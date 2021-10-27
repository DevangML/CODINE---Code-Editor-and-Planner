import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <FaIcons.FaCartPlus />
  },
  {
    title: 'Editors',
    path: '',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Vanilla Web',
        path: '/vanilla',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'POP Compiler',
        path: '/pop',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'OOP Compiler',
        path: '/oop',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Tools',
    path: '',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Project Planner',
        path: '/proj',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'To-Do List',
        path: '/todo',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Componentor',
        path: '/comp',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Contact Me',
    path: '/contact',
    icon: <FaIcons.FaEnvelopeOpenText />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />
  }
]
