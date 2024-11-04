import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilCloudDownload,
  cibProbot
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info'
    },
  },
  {
    component: CNavItem,
    name: 'ChatBot',
    to: '/ChatBot',
    icon: <CIcon icon={cibProbot} customClassName="nav-icon" />,
    badge: {
      color: 'info'
    },
  },
  // {
  //   component: CNavItem,
  //   name: 'Upload CSV',
  //   to: '/UploadCSV',
  //   icon: <CIcon icon={cilCloudDownload} customClassName="nav-icon" />,
  // },
  
]

export default _nav
