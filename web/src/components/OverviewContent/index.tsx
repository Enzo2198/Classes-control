import {Box, Button, Grid, Paper, styled, Tooltip, Typography} from "@mui/material";
import {ContentCopy as ContentCopyIcon,} from '@mui/icons-material';
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import type {OverviewContentProps, Member} from "../../utils";
import {AvatarDefault} from "../index.tsx";
import MembersContent from "../MembersContent";
import RecentActivity from "../RecentActivity";
import {toast} from "react-toastify";

export default function OverviewContent({course, examGroups}: OverviewContentProps) {
  const teachers: Member[] = course.teachers;
  const students: Member[] = course.students;
  const teachersName: string = teachers.map(teacher => teacher.name).join(", ");
  const newUsers: Member[] = [...teachers, ...students];

  /*********** share invite link *************/
  const baseUrl: string = window.location.origin;
  const linkToInvite = `${baseUrl}/invite?class=${course.id}`
  const onCopyLink = () => {
    navigator.clipboard.writeText(linkToInvite).then(() => {
      toast.info('Đã sao chép link lớp học!')
    }).catch((err) => {
      toast.error('Sao chép thất bại!');
      console.error('Failed to copy link to clipboard:', err)
    });
  }

  const Item = styled(Paper)(({theme}) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));

  return (
    <>
      <Box sx={{display: 'flex', justifyContent: 'space-around', gap: '20px', alignItems: 'flex-start'}}>
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

        {/* Recent Activity section */}
        <Grid size={{xs: 0, lg: 4}} sx={{flexGrow: 1, flexShrink: 0}}>
          <RecentActivity examGroups={examGroups}/>
        </Grid>
      </Box>
    </>
  )
}
