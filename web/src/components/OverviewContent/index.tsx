// import {
//   Avatar,
//   Box,
//   Button,
//   Grid,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Paper, Skeleton,
//   styled, Tooltip,
//   Typography
// } from "@mui/material";
// import {
//   AccessTime as ClockIcon,
//   ContentCopy as ContentCopyIcon,
//   NotificationsOutlined as NotificationIcon
// } from '@mui/icons-material';
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import PeopleIcon from "@mui/icons-material/People";
// import type {Test, ClassroomContextType} from "../../utils";
// import {useOutletContext} from "react-router";
// import {useExams} from "../ClassroomLayout/examsProvider.tsx";
// import {AvatarDefault, MembersContent} from "../index.tsx";
// import {useInviteLink} from "./inviteLink.tsx";
//
// export default function OverviewContent() {
//   const {members, classInfo} = useOutletContext<ClassroomContextType>();
//   // const {user} = useUser();
//   const {exams} = useExams();
//   const {onCopyLink} = useInviteLink();
//
//   const Item = styled(Paper)(({theme}) => ({
//     backgroundColor: '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: (theme.vars ?? theme).palette.text.secondary,
//     ...theme.applyStyles('dark', {
//       backgroundColor: '#1A2027',
//     }),
//   }));
//
//   return (
//     <>
//       <Box sx={{display: 'flex', justifyContent: 'space-around', gap: '20px', alignItems: 'flex-start'}}>
//         <Box sx={{flexGrow: 1}}>
//           {/* Header section */}
//           <Paper
//             elevation={0}
//             sx={{
//               p: 3,
//               mb: 3,
//               borderRadius: 2,
//               background: 'linear-gradient(to right, #2ea7db, #90cdf4)',
//               color: 'white'
//             }}>
//
//             <Box>
//               <Box>
//                 <Typography variant="h5" fontWeight="bold" sx={{mb: 1}}>
//                   <AssignmentIcon sx={{mr: 1, verticalAlign: 'middle'}}/>
//                   {classInfo ? classInfo.name : <Skeleton width={120} />}
//                 </Typography>
//
//                 <Typography variant="body1" sx={{opacity: 0.9}}>
//                   Giáo viên: {user?.role === 'teacher' ? user.name: ''}
//                 </Typography>
//
//                 <Box sx={{display: 'flex', alignItems: 'flex-end', mt: 2, gap: '10px'}}>
//                   <Typography variant="body1" sx={{opacity: 0.9}}>
//                     Chia sẻ lớp học
//                   </Typography>
//
//                   <Box sx={{display: 'flex', justifyContent: 'center'}}>
//                     <Tooltip title={'Copy link mời vào lớp'} arrow>
//                       <Button
//                         variant="outlined"
//                         startIcon={<ContentCopyIcon/>}
//                         size="small"
//                         sx={{
//                           mt: 1,
//                           color: 'white',
//                           borderColor: 'white',
//                           '&:hover': {
//                             backgroundColor: 'rgba(255, 255, 255, 0.1)',
//                             borderColor: 'white',
//                           }
//                         }}
//                         onClick={onCopyLink}
//                       >
//                         <Typography variant='caption' sx={{opacity: 0.9}}>
//                           Sao chép liên kết
//                         </Typography>
//                       </Button>
//                     </Tooltip>
//                   </Box>
//
//                   <Box sx={{display: 'flex', ml: 'auto'}}>
//                     {members.map((member) =>
//                       <AvatarDefault key={member.id} user={member} width={36} height={36} />
//                     )}
//                   </Box>
//                 </Box>
//
//               </Box>
//
//             </Box>
//
//           </Paper>
//
//           {/* Statistics section */}
//           <Grid container spacing={2}>
//             < Grid size={6}>
//               <Item>
//                 <Paper elevation={0} sx={{p: 2, borderRadius: 2}}>
//                   <Box sx={{display: 'flex', alignItems: 'center'}}>
//                     <PeopleIcon sx={{color: '#3498db', mr: 2, fontSize: 48}}/>
//                     <Typography variant="h5" fontWeight="medium">
//                       {members.length} Thành Viên
//                     </Typography>
//                   </Box>
//                 </Paper>
//               </Item>
//             </Grid>
//
//             < Grid size={6}>
//               <Item>
//                 <Paper elevation={0} sx={{p: 2, borderRadius: 2}}>
//                   <Box sx={{display: 'flex', alignItems: 'center'}}>
//                     <PeopleIcon sx={{color: '#3498db', mr: 2, fontSize: 48}}/>
//                     <Typography variant="h5" fontWeight="medium">
//                       {exams.length} Bài Kiểm Tra
//                     </Typography>
//                   </Box>
//                 </Paper>
//               </Item>
//             </Grid>
//           </Grid>
//           <MembersContent/>
//         </Box>
//
//         {/* Recent Activity section */}
//         <Box sx={{
//           width: 320,
//           flexShrink: 0,
//           borderLeft: '1px solid #e0e0e0',
//           p: 3,
//           backgroundColor: '#fff',
//           borderRadius: 3
//         }}>
//           <Typography variant="h6" fontWeight="bold" mb={3}>
//             <NotificationIcon sx={{verticalAlign: 'middle', mr: 1}}/>
//             Hoạt động gần đây
//           </Typography>
//
//           <List>
//             {exams.reverse().map((test: Test) => (
//               <ListItem key={test.id} sx={{px: 0, py: 1}}>
//                 <ListItemIcon sx={{minWidth: 40}}>
//                   <Avatar
//                     sx={{width: 32, height: 32}}
//                   />
//                 </ListItemIcon>
//                 <ListItemText
//                   primary={
//                     <Typography variant="body2">Bài thi' '
//                       <Typography component="span" color="primary" fontWeight="medium">{test.name}</Typography> vừa được
//                       tải lên
//                     </Typography>
//                   }
//                   secondary={
//                     <Box component="span" sx={{display: 'flex', alignItems: 'center', mt: 0.5}}>
//                       <ClockIcon sx={{fontSize: 14, mr: 0.5, color: 'text.secondary'}}/>
//                       <Typography variant="caption" color="text.secondary">
//                         {test.start_time}
//                       </Typography>
//                     </Box>
//                   }
//                 />
//               </ListItem>
//             ))
//             }
//           </List>
//
//         </Box>
//       </Box>
//     </>
//   )
// }
//
// // function MembersContent(members: Member[]) {
// //   return (
// //     <Box sx={{mt: 3}}>
// //       <TableContainer component={Paper} elevation={0} sx={{p: 2}}>
// //         <Typography variant="h6" fontWeight="bold" sx={{mb: 1}} color={'primary'}>
// //           Danh sách thành viên
// //         </Typography>
// //         <Table>
// //           <TableHead>
// //             <TableRow>
// //               <TableCell sx={{fontWeight: 'bold', color: '#666'}}>NO.</TableCell>
// //               <TableCell sx={{fontWeight: 'bold', color: '#666'}}>HỌ TÊN</TableCell>
// //               <TableCell sx={{fontWeight: 'bold', color: '#666'}}>VỊ TRÍ</TableCell>
// //               <TableCell></TableCell>
// //             </TableRow>
// //           </TableHead>
// //           <TableBody>
// //             {members.map((member) => (
// //               <TableRow
// //                 key={member.id}
// //                 sx={member.id % 2 === 0 ? {} : {backgroundColor: '#f5f9fc'}}
// //               >
// //                 <TableCell>{member.id}</TableCell>
// //                 <TableCell>{member.name}</TableCell>
// //                 <TableCell>
// //                   <Chip
// //                     label={member.role}
// //                     size="small"
// //                     sx={{
// //                       backgroundColor: member.role === 'Giáo viên' ? 'rgba(255, 118, 117, 0.5)' : 'rgb(46, 204, 113)',
// //                       color: 'white',
// //                     }}
// //                   />
// //                 </TableCell>
// //                 <TableCell align="right">
// //                   {member.role === 'Giáo viên' && (
// //                     <Chip
// //                       icon={<KeyIcon size="small"/>}
// //                       size="small"
// //                       sx={{backgroundColor: '#f9ca24', color: '#fff'}}
// //                     />
// //                   )}
// //                 </TableCell>
// //               </TableRow>
// //             ))}
// //           </TableBody>
// //         </Table>
// //       </TableContainer>
// //     </Box>
// //   );
// // }
//
// // function KeyIcon(props: any) {
// //   return (
// //     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...props} >
// //       <path
// //         d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"
// //         stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
// //     </svg>
// //   );
// // }