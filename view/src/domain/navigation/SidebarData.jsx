import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <FaIcons.FaCartPlus />,
  },
  {
    title: 'Editors',
    path: '/vanilla',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Vanilla Web',
        path: '/vanilla',
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: 'Live Compiler',
        path: '/compiler',
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: 'Tools',
    path: '/proj',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Project Planner',
        path: '/proj',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav',
      },
      {
        title: 'To-Do List',
        path: '/todo',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav',
      },
    ],
  },
  {
    title: 'Contact Me',
    path: '/contact',
    icon: <FaIcons.FaEnvelopeOpenText />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Register',
    path: '/register',
    icon: <FaIcons.FaEnvelopeOpenText />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Login',
    path: '/login',
    icon: <FaIcons.FaEnvelopeOpenText />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
];

export default SidebarData;
