import {Box, List, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import {Link, Outlet, useLocation, useParams} from 'react-router-dom';
import {type ReactNode, useEffect, useState} from "react";
import {getMethod, type Member} from "../../utils";
import {ExamsContext} from "./examsProvider.tsx"

interface ClassroomLayoutProps {
  className: string;
  children?: ReactNode;
}

const ClassroomLayout = ({ className }: ClassroomLayoutProps) => {
  const { id } = useParams<{ id: string }>();
  const teacherName = "Trần Xuân Bảng";

  // Get Members
  const [members, setMembers] = useState<Member[]>([]);
  useEffect(() => {
    const getMembers = async () => {
      try {
        if (!id) return;
        const response = await getMethod<{ users: Member[] }>(`master/class/${id}`);
        if(response?.users) return setMembers(response.users);
      } catch (error) {
        console.error('Failed to fetch members:', error);
      }
    };
    getMembers();
  }, [id]);

  // Get Exams
  const [exams, setExams] = useState<any[]>([]);
  const getExams = async () => {
    try {
      if (!id) return;
      const response = await getMethod(`exam_group/?class_id=${id}`);
      setExams(response as any[]);
    } catch (error) {
      console.error('Failed to fetch exams:', error);
    }
  };
  useEffect(() => {
    getExams();
  }, [id]);


  const location = useLocation();
  const pathname = location.pathname;

  const getSelectedIndex = () => {
    if (pathname.includes("/exam")) return 1;
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
          <Outlet context={{ className, teacherName, members }} />
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