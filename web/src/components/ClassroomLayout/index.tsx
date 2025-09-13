import {Box, List, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import {Link, Outlet} from 'react-router-dom';
import {ExamsContext} from "./examsProvider.tsx"
import {useClassroomLayout} from "./classroomLayout.tsx";
import type {ReactNode} from "react";

export interface ClassroomLayoutProps {
  className: string;
  children?: ReactNode;
}

const ClassroomLayout = ({className}: ClassroomLayoutProps) => {
  const {selectedIndex, exams, getExams, members} = useClassroomLayout()

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
            to="exam"
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
        <ExamsContext.Provider value={{ exams, getExams }}>
          <Outlet context={{ className, members }} />
        </ExamsContext.Provider>
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