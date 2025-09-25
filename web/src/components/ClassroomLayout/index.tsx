import {Box} from "@mui/material";
import {ExamsContext} from "./examsProvider.tsx"
import {useClassroomLayout} from "./classroomLayout.tsx";
import type {ClassroomLayoutProps} from "../../utils";
import {SideBar} from "./PageSection/sideBar.tsx";
import { Outlet } from "react-router";


const ClassroomLayout = ({className}: ClassroomLayoutProps) => {
  const {classInfo, exams, refetch, members, loading, error} = useClassroomLayout()

  return (
    <Box sx={{height: 'calc(100vh - 64px)', display: 'flex', backgroundColor: '#f5f5f5'}}>
      <SideBar/>

      {/*************** Main Content ******************/}
      <Box component="main" sx={{flexGrow: 1, p: 3, overflowY: 'auto'}}>
        <ExamsContext.Provider value={{exams, refetchExams: refetch.exams}}>
          <Outlet context={{className, members, loading, error, classInfo}}/>
        </ExamsContext.Provider>
      </Box>
    </Box>
  )
}


export default ClassroomLayout;