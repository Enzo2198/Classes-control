// import {Box, List, ListItemButton, ListItemIcon, ListItemText, } from "@mui/material";
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import AssignmentIcon from '@mui/icons-material/Assignment';
// import PeopleIcon from '@mui/icons-material/People';
// import {Link} from 'react-router-dom';
// import {CopyrightInfo} from "./copyrightInfo.tsx";
// import {useClassroomLayout} from "../classroomLayout.tsx";
//
// export function SideBar() {
//   const {selectedIndex} = useClassroomLayout()
//
//   return (
//     <Box sx={{
//         width: '100%',
//         maxWidth: 260,
//         backgroundColor: 'background.paper',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'space-between'
//       }}>
//         <List
//           component="nav"
//           aria-label="main mailbox folders"
//           sx={{padding: 0}}>
//           <ListItemButton
//             component={Link}
//             to="overview"
//             selected={selectedIndex === 0}
//           >
//             <ListItemIcon>
//               <DashboardIcon color={selectedIndex === 0 ? 'primary' : 'action'}/>
//             </ListItemIcon>
//             <ListItemText
//               primary="Tổng quan"
//               slotProps={{
//                 primary: {color: selectedIndex === 0 ? 'primary' : 'action'}
//               }}/>
//           </ListItemButton>
//           <ListItemButton
//             component={Link}
//             to="exam"
//             selected={selectedIndex === 1}
//           >
//             <ListItemIcon>
//               <AssignmentIcon color={selectedIndex === 1 ? 'primary' : 'action'}/>
//             </ListItemIcon>
//             <ListItemText
//               primary="Bài thi"
//               slotProps={{
//                 primary: {color: selectedIndex === 1 ? 'primary' : 'action'}
//               }}/>
//           </ListItemButton>
//           <ListItemButton
//             component={Link}
//             to="members"
//             selected={selectedIndex === 2}
//           >
//             <ListItemIcon>
//               <PeopleIcon color={selectedIndex === 2 ? 'primary' : 'action'}/>
//             </ListItemIcon>
//             <ListItemText
//               primary="Thành viên"
//               slotProps={{
//                 primary: {color: selectedIndex === 2 ? 'primary' : 'action'}
//               }}/>
//           </ListItemButton>
//         </List>
//
//         <CopyrightInfo/>
//       </Box>
//   )
// }