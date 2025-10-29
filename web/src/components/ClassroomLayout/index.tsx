import {Box, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {useClassroomLayout} from "./classroomLayout.tsx";
import {ExamGroupDetail, ExamsContent, Loading, MembersContent, OverviewContent} from "../index.tsx";
import { cloneElement } from "react";
import {Link, Route, Routes } from "react-router";
import {CopyrightInfo} from "./PageSection/copyrightInfo.tsx";
import TeacherExamDetail from "../ExamGroup/Teacher/Page/examUploadPdf.tsx";
import TeacherMarking from "../ExamGroup/Teacher/Page/marking.tsx";


const ClassroomLayout = () => {
  const {course, loading, examGroups, menuItems, isActive,} = useClassroomLayout()

  if (loading) return <Loading/>

  return (
    <Box sx={{height: 'calc(100vh - 64px)', display: 'flex', backgroundColor: '#f5f5f5'}}>
      <Box sx={{
        width: '100%', maxWidth: 260, backgroundColor: 'background.paper',
        display: {xs: 'none', md: 'flex'}, flexDirection: 'column', justifyContent: 'space-between'
      }}>
        <List
          component="nav"
          aria-label="main mailbox folders"
          sx={{
            pt: 0,
            mt: 0,
            paddingTop: 0
          }}
        >
          {menuItems.map((item) => {
            const active = isActive(item.segment);
            return (
              <ListItemButton
                key={item.text}
                component={Link}
                to={item.path}
                selected={active}
              >
                <ListItemIcon>
                  {cloneElement(item.icon, {color: active ? 'primary' : 'action'})}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  slotProps={{
                    primary: {
                      color: active ? 'primary' : 'action'
                    }
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
        <CopyrightInfo/>
      </Box>

      <Box component="main" sx={{flexGrow: 1, p: 3, overflowY: 'auto'}}>
        <Routes>
          <Route index element={<OverviewContent
            course={course}
            examGroups={examGroups}/>}/>
          <Route path="exam" element={<ExamsContent course={course}/>}/>
          <Route path="member" element={<MembersContent course={course}/>}/>
          <Route path="exam/:examGroupId" element={<ExamGroupDetail/>}/>
          <Route path="exam/:examGroupId/:examId" element={<TeacherExamDetail/>}/>
          <Route path="exam/:examGroupId/marking" element={<TeacherMarking/>}/>
        </Routes>
      </Box>
    </Box>
  )
}


export default ClassroomLayout;