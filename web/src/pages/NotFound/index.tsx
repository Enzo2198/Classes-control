// import {Button, Typography, Container, Paper} from "@mui/material";
// import {Home as HomeIcon} from "@mui/icons-material";
// import {useAuth} from "../../auth/useAuth.ts";
// import {useState} from "react";
//
// export default function NotFound() {
//   const {initializeAuth, isAuthenticated} = useAuth()
//   const [isNavigating, setIsNavigating] = useState(false);
//
//   const onGoBack = async () => {
//     if (isNavigating) return
//     setIsNavigating(true);
//
//     try {
//       const timeoutPromise = new Promise((_, reject) =>
//         setTimeout(() => reject(new Error('Auth initialization timeout')), 500)
//       )
//       await Promise.race([initializeAuth(), timeoutPromise])
//
//       if (isAuthenticated) {
//         window.location.href = '/classes'
//       } else {
//         window.location.href = '/login'
//       }
//     } catch (error) {
//       console.error('Navigation error', error)
//       window.location.href = '/login'
//     } finally {
//       setIsNavigating(false);
//     }
//   }
//
//   return (
//     <Container
//       maxWidth="md"
//       sx={{
//         height: '100vh',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center'
//       }}
//     >
//       <Paper
//         elevation={8}
//         sx={{
//           p: 6,
//           textAlign: 'center',
//           borderRadius: 4,
//           // background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
//           // border: '1px solid rgba(255, 255, 255, 0.3)',
//           // backdropFilter: 'blur(10px)',
//           maxWidth: 500,
//           width: '100%'
//         }}
//       >
//         {/* Title */}
//         <Typography
//           component="h1"
//           variant="h3"
//           fontWeight="bold"
//           sx={{mb: 2, color: 'red'}}
//         >
//           404 - Page Not Found!
//         </Typography>
//
//         {/* Description */}
//         <Typography
//           component="p"
//           variant="h6"
//           sx={{
//             mb: 4,
//             lineHeight: 1.6,
//             maxWidth: '80%',
//             mx: 'auto'
//           }}
//         >
//           Oops! The page you are looking for does not exist.
//         </Typography>
//
//         {/* Action Button */}
//         <Button
//           variant="contained"
//           size="large"
//           startIcon={<HomeIcon />}
//           onClick={onGoBack}
//           disabled={isNavigating}
//           sx={{
//             px: 4,
//             py: 1.5,
//             borderRadius: 3,
//             fontSize: '1.1rem',
//             fontWeight: 'bold',
//             textTransform: 'none',
//             '&:hover': {
//               transform: 'translateY(-2px)'
//             },
//             transition: 'all 0.3s ease'
//           }}
//         >
//           Back to Homepage
//         </Button>
//
//         {/* Additional Help Text */}
//         <Typography
//           variant="body2"
//           color="text.secondary"
//           sx={{
//             mt: 3,
//             fontSize: '0.9rem'
//           }}
//         >
//           If you believe this is an error, please contact support
//         </Typography>
//       </Paper>
//     </Container>
//   )
// }