import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BusinessIcon from '@mui/icons-material/Business';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { getUserData } from '../../../../utils/manageUserData';
import { PRIVATE_ROUTES } from '../../../../constants/routes';

import './SideBar.css'

function PersistentClippedDrawer({ open, drawerWidth }) {
  const [attendanceOpen, setAttendanceOpen] = useState(false);
  const [leaveOpen, setLeaveOpen] = useState(false);
  const user = getUserData();
  const role = user.role;
  const hasTeam = true;
  const location = useLocation();

  const handleAttendanceToggle = () => {
    setAttendanceOpen(!attendanceOpen);
  };

  const handleLeaveToggle = () => {
    setLeaveOpen(!leaveOpen);
  };

  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          top: '66px',
          transition: 'transform 0.75s ease',
        }
      }}
    >
      <List sx={{p:2}}>
        {/* Dashboard */}
        <ListItem disablePadding className={location.pathname==PRIVATE_ROUTES.DASHBOARD ? 'active-option':'sidebar-option'}>
          <ListItemButton component={Link} to={PRIVATE_ROUTES.DASHBOARD}>
            <ListItemIcon className='sidebar-icon'><DashboardIcon className='a'/></ListItemIcon>
            <ListItemText primary="Dashboard" className='a'/>
          </ListItemButton>
        </ListItem>

        {/* Users (Admin only) */}
        {role === 'Admin' && (
          <ListItem disablePadding className={location.pathname==PRIVATE_ROUTES.USERS ? 'active-option':'sidebar-option'}>
            <ListItemButton component={Link} to={PRIVATE_ROUTES.USERS} >
              <ListItemIcon className='sidebar-icon'><PeopleIcon className='a'/></ListItemIcon>
              <ListItemText primary="Users" className='a' />
            </ListItemButton>
          </ListItem>
        )}

        {/* Attendance */}
        {role === 'Admin' ? (
          <ListItem disablePadding className={location.pathname==PRIVATE_ROUTES.ATTENDANCE_TEAM ? 'active-option':'sidebar-option'}>
            <ListItemButton component={Link} to={PRIVATE_ROUTES.ATTENDANCE_TEAM} >
              <ListItemIcon className='sidebar-icon'><EventAvailableIcon className='a'/></ListItemIcon>
              <ListItemText primary="Attendance" className='a'/>
            </ListItemButton>
          </ListItem>
        ) : hasTeam === false ? (
          <ListItem disablePadding className={location.pathname==PRIVATE_ROUTES.ATTENDANCE_SELF ? 'active-option':'sidebar-option'}>
            <ListItemButton component={Link} to={PRIVATE_ROUTES.ATTENDANCE_SELF} >
              <ListItemIcon className='sidebar-icon'><EventAvailableIcon className='a'/></ListItemIcon>
              <ListItemText primary="Attendance" className='a'/>
            </ListItemButton>
          </ListItem>
        ) : (
          <>
            <ListItem disablePadding >
              <ListItemButton onClick={handleAttendanceToggle} >
                <ListItemIcon className='sidebar-icon'><EventAvailableIcon className='a'/></ListItemIcon>
                <ListItemText primary="Attendance" className='a' />
                {attendanceOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={attendanceOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 3 }}>
                <ListItem disablePadding className={location.pathname==PRIVATE_ROUTES.ATTENDANCE_SELF ? 'active-option':'sidebar-option'}>
                  <ListItemButton component={Link} to={PRIVATE_ROUTES.ATTENDANCE_SELF} >
                    <ListItemText primary="Self" className='a' />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding className={location.pathname==PRIVATE_ROUTES.ATTENDANCE_TEAM ? 'active-option':'sidebar-option'}>
                  <ListItemButton component={Link} to={PRIVATE_ROUTES.ATTENDANCE_TEAM} >
                    <ListItemText primary="Team" className='a' />
                  </ListItemButton>
                </ListItem>
              </List>
            </Collapse>
          </>
        )}

        {/* Leave */}
        {role === 'Admin' ? (
          <ListItem disablePadding className={location.pathname==PRIVATE_ROUTES.LEAVE_TEAM ? 'active-option':'sidebar-option'}>
            <ListItemButton component={Link} to={PRIVATE_ROUTES.LEAVE_TEAM} >
              <ListItemIcon className='sidebar-icon'><AssignmentIcon className='a'/></ListItemIcon>
              <ListItemText primary="Leave" className='a' />
            </ListItemButton>
          </ListItem>
        ): hasTeam === false ? (
          <ListItem disablePadding className={location.pathname==PRIVATE_ROUTES.LEAVE_SELF ? 'active-option':'sidebar-option'}>
            <ListItemButton component={Link} to={PRIVATE_ROUTES.LEAVE_SELF} >
              <ListItemIcon className='sidebar-icon'><AssignmentIcon className='a'/></ListItemIcon>
              <ListItemText primary="Leave" className='a' />
            </ListItemButton>
          </ListItem>
        ) : (
          <>
            <ListItem disablePadding >
              <ListItemButton onClick={handleLeaveToggle} >
                <ListItemIcon className='sidebar-icon'><AssignmentIcon className='a'/></ListItemIcon>
                <ListItemText primary="Leave" className='a' />
                {leaveOpen || <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={leaveOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 3 }}>
                <ListItem disablePadding className={location.pathname==PRIVATE_ROUTES.LEAVE_SELF ? 'active-option':'sidebar-option'}>
                  <ListItemButton component={Link} to={PRIVATE_ROUTES.LEAVE_SELF} >
                    <ListItemText primary="Self" className='a' />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding className={location.pathname==PRIVATE_ROUTES.LEAVE_TEAM ? 'active-option':'sidebar-option'}>
                  <ListItemButton component={Link} to={PRIVATE_ROUTES.LEAVE_TEAM} >
                    <ListItemText primary="Team" className='a' />
                  </ListItemButton>
                </ListItem>
              </List>
            </Collapse>
          </>
        )}

        {/* Holiday */}
        <ListItem disablePadding className={location.pathname==PRIVATE_ROUTES.HOLIDAY ? 'active-option':'sidebar-option'}>
          <ListItemButton component={Link} to={PRIVATE_ROUTES.HOLIDAY} >
            <ListItemIcon className='sidebar-icon'><CalendarTodayIcon className='a'/></ListItemIcon>
            <ListItemText primary="Holiday" className='a' />
          </ListItemButton>
        </ListItem>

        {/* Department (Admin only) */}
        {role === 'Admin' && (
          <ListItem disablePadding className={location.pathname==PRIVATE_ROUTES.DEPARTMENT ? 'active-option':'sidebar-option'}>
            <ListItemButton component={Link} to={PRIVATE_ROUTES.DEPARTMENT} >
              <ListItemIcon className='sidebar-icon'><BusinessIcon className='a'/></ListItemIcon>
              <ListItemText primary="Department" className='a' />
            </ListItemButton>
          </ListItem>
        )}

        {/* Report & Analytics (Admin, SeniorManager, Manager) */}
        {(role === 'Admin' || role === 'SeniorManager' || role === 'Manager') && (
          <ListItem disablePadding className={location.pathname==PRIVATE_ROUTES.REPORT_ANALYTICS ? 'active-option':'sidebar-option'}>
            <ListItemButton component={Link} to={PRIVATE_ROUTES.REPORT_ANALYTICS} >
              <ListItemIcon className='sidebar-icon'><AnalyticsIcon className='a'/></ListItemIcon>
              <ListItemText primary="Report & Analytics" className='a' />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Drawer>
  );
}

export default PersistentClippedDrawer;