import {Box, List, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import { Link, Outlet, useLocation} from 'react-router';
import type {ReactNode} from "react";

interface ClassroomLayoutProps {
  className: string;
  children?: ReactNode;
}

const ClassroomLayout = ({ className }: ClassroomLayoutProps) => {
  const teacherName = "Trần Xuân Bảng";
  const members = [
    {id: 1, name: "Trần Xuân Bảng", role: "Giáo viên"},
    {id: 2, name: "Phạm Thùy Dương", role: "Học sinh"},
    {id: 3, name: "bang", role: "Học sinh"},
  ];

  const tests = [
    {id: 1, name: "ĐỀ THI LẦN 1", date: "23-01-2024 04:40:21"},
    {id: 2, name: "Thi thu lan 2", date: "26-01-2024 10:59:23"},
    {id: 3, name: "Thu Thu Lan 3", date: "28-01-2024 10:21:55"},
    {id: 4, name: "Thi Thu 4", date: "30-01-2024 09:04:04"},
    {id: 5, name: "Thu Thi 5", date: "22-04-2024 06:24:49"},
  ];

  const location = useLocation();
  const pathname = location.pathname;

  const getSelectedIndex = () => {
    if (pathname.includes("/tests")) return 1;
    if (pathname.includes("/members")) return 2;
    return 0;
  };

  const selectedIndex = getSelectedIndex();

  return (
    <Box sx={{
      height: 'calc(100vh - 64px)',
      display: 'flex',
      backgroundColor: '#f5f5f5'
    }}>

      {/*sidebar*/}
      <Box sx={{
        width: '100%',
        maxWidth: 260,
        backgroundColor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'}}>
        <List
          component="nav"
          aria-label="main mailbox folders"
          sx={{padding: 0}}>
          <ListItemButton
            component={Link}
            to="overview"
            selected={selectedIndex === 0}
          >
            <ListItemIcon>
              <DashboardIcon color={selectedIndex === 0 ? 'primary' : 'action'}/>
            </ListItemIcon>
            <ListItemText
              primary="Tổng quan"
              slotProps={{
                primary: {color: selectedIndex === 0 ? 'primary' : 'action'}
              }}/>
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="tests"
            selected={selectedIndex === 1}
          >
            <ListItemIcon>
              <AssignmentIcon color={selectedIndex === 1 ? 'primary' : 'action'}/>
            </ListItemIcon>
            <ListItemText
              primary="Bài thi"
              slotProps={{
                primary: {color: selectedIndex === 1 ? 'primary' : 'action'}
              }}/>
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="members"
            selected={selectedIndex === 2}
          >
            <ListItemIcon>
              <PeopleIcon color={selectedIndex === 2 ? 'primary' : 'action'}/>
            </ListItemIcon>
            <ListItemText
              primary="Thành viên"
              slotProps={{
                primary: {color: selectedIndex === 2 ? 'primary' : 'action'}
              }}/>
          </ListItemButton>
        </List>

        <CopyrightInfo />
      </Box>

      {/* Main Content */}
      <Box component="main" sx={{flexGrow: 1, p: 3, overflowY: 'auto'}}>
        <Outlet context={{ className, teacherName, members, tests }} />
      </Box>
    </Box>
  )
}

function CopyrightInfo(){
  return  (
    <Box sx={{p: 2, mt: 'auto'}}>
      <Typography variant="caption" color="text.secondary" sx={{display: 'block', textAlign: 'center'}}>
        ©2024 All rights reserved BKStar
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{display: 'block', textAlign: 'center'}}>
        Version 1.3.1
      </Typography>
    </Box>
  )
}

export default ClassroomLayout;