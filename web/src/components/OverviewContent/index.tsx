import {Box, Button, Grid, Paper, Tooltip, Typography} from "@mui/material";
import {ContentCopy as ContentCopyIcon,} from '@mui/icons-material';
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import type {Course, ExamGroup} from "../../utils";
import {AvatarDefault} from "../index.tsx";
import MembersContent from "../MembersContent";
import RecentActivity from "../RecentActivity";
import useOverviewContent from "./overviewContent.ts";

export default function OverviewContent({course, examGroups}: {course: Course, examGroups: ExamGroup[]}) {
  const {teachersName, newUsers, onCopyLink, Item} = useOverviewContent({course})

  return (
    <>
      <Box sx={{justifyContent: 'space-around', gap: '20px', alignItems: 'flex-start'}}>
        <Grid container spacing={2}>
          <Grid size={{xs: 12, lg: 8}}>
            <Box sx={{flexGrow: 1}}>
              {/* Header section */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  mb: 3,
                  borderRadius: 2,
                  background: 'linear-gradient(to right, #2ea7db, #90cdf4)',
                  color: 'white'
                }}>

                <Box>
                  <Box>
                    <Typography variant="h5" fontWeight="bold" sx={{mb: 1}}>
                      <AssignmentIcon sx={{mr: 1, verticalAlign: 'middle'}}/>
                      {course.name}
                    </Typography>

                    <Typography variant="body1" sx={{opacity: 0.9}}>
                      Giáo viên: {teachersName}
                    </Typography>

                    <Box sx={{display: 'flex', alignItems: 'flex-end', mt: 2, gap: '10px'}}>
                      <Typography variant="body1" sx={{opacity: 0.9}}>
                        Chia sẻ lớp học
                      </Typography>

                      <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <Tooltip title={'Copy link mời vào lớp'} arrow>
                          <Button
                            variant="outlined"
                            startIcon={<ContentCopyIcon/>}
                            size="small"
                            sx={{
                              mt: 1,
                              color: 'white',
                              borderColor: 'white',
                              '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                borderColor: 'white',
                              }
                            }}
                            onClick={onCopyLink}
                          >
                            <Typography variant='caption' sx={{opacity: 0.9}}>
                              Sao chép liên kết
                            </Typography>
                          </Button>
                        </Tooltip>
                      </Box>
                      <Box sx={{display: 'flex', ml: 'auto'}}>
                        {newUsers.map((member) =>
                          <AvatarDefault key={member.id} fullName={member.name} width={36} height={36}/>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Paper>

              {/* Statistics section */}
              <Grid container spacing={2}>
                < Grid size={6}>
                  <Item>
                    <Paper elevation={0} sx={{p: 2, borderRadius: 2}}>
                      <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <PeopleIcon sx={{color: '#3498db', mr: 2, fontSize: 48}}/>
                        <Typography variant="h5" fontWeight="medium">
                          {newUsers.length} Thành Viên
                        </Typography>
                      </Box>
                    </Paper>
                  </Item>
                </Grid>

                < Grid size={6}>
                  <Item>
                    <Paper elevation={0} sx={{p: 2, borderRadius: 2}}>
                      <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <PeopleIcon sx={{color: '#3498db', mr: 2, fontSize: 48}}/>
                        <Typography variant="h5" fontWeight="medium">
                          {examGroups.length} Bài Kiểm Tra
                        </Typography>
                      </Box>
                    </Paper>
                  </Item>
                </Grid>
              </Grid>

              {/* Members section */}
              <MembersContent course={course}/>
            </Box>
          </Grid>

          {/* Recent Activity section */}
          <Grid size={{xs: 0, lg: 4}} sx={{flexGrow: 1, flexShrink: 0, width: '100%'}}>
            <RecentActivity examGroups={examGroups}/>
          </Grid>

        </Grid>


      </Box>
    </>
  )
}
