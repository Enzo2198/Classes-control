// import {GHeader, Loading} from "../../components";
// import {Avatar, Box, Button, Container, Grid, Paper, TextField, Typography} from "@mui/material";
// import {useProfile} from "./profiles.tsx";
//
// export default function Profile() {
//   const {
//     infoFormData,
//     passwordFormData,
//     touchedInfo,
//     touchedPassword,
//     infoHelperTexts,
//     passwordHelperTexts,
//     onChange,
//     onSubmitInfo,
//     onSubmitPassword,
//     handleFileUpload,
//     handleBlur,
//     isLoadingInfo
//   } = useProfile();
//
//
//   if (isLoadingInfo) return <Loading/>
//
//   return (
//     <>
//       <GHeader/>
//       <Container
//         maxWidth={false}
//         component={"main"}
//         sx={{
//           mt: '64px',
//           minHeight: 'calc(100vh - 64px)',
//           backgroundColor: "#f0f0f0",
//           p: 2
//         }}
//       >
//         <h1 style={{margin: '0 auto 10px', fontWeight: 600, textAlign: 'center'}}>THÔNG TIN CÁ NHÂN</h1>
//
//         <Paper sx={{
//           width: "100%",
//           borderRadius: "10px",
//           overflow: "hidden", // to remain effect of border-radius with child grid items
//           boxShadow: "0 0 2px #000000"
//         }}>
//
//           <Box component={'form'} sx={{width: '100%', p: 2}} onSubmit={onSubmitInfo}>
//             <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
//               <Typography
//                 component={'h2'} color={'primary'}
//                 sx={{fontWeight: 600, fontSize: 20}}>THÔNG TIN CƠ BẢN</Typography>
//               <Button
//                 variant={'contained'} size={'large'}
//                 sx={{fontWeight: 600, borderRadius: 2}}
//                 type={'submit'}>Lưu lại</Button>
//             </Box>
//
//             <Grid size={{xs: 12}} sx={{textAlign: 'center', mb: 2}}>
//               <Avatar
//                 alt="Avatar"
//                 src={infoFormData.avatar_info?.url ?? undefined}
//                 sx={{width: 120, height: 120, mx: 'auto'}}
//               />
//               <input
//                 accept="image/*"
//                 id="avatar-upload"
//                 type="file"
//                 style={{display: 'none'}}
//                 onChange={handleFileUpload}
//               />
//               <label htmlFor="avatar-upload">
//                 <Button variant="contained" component="span" sx={{mt: 1}}>
//                   Tải lên
//                 </Button>
//               </label>
//             </Grid>
//
//             <Grid container spacing={3}>
//               <Grid size={{xs: 12, md: 6}} width={'100%'}>
//                 <Typography
//                   sx={{fontWeight: 600, fontSize: 18}}
//                   color={'textPrimary'}>Tên của bạn</Typography>
//                 <TextField
//                   fullWidth size={'small'} sx={{my: 1}}
//                   placeholder={'Nhập tên của bạn'}
//
//                   name={'name'}
//                   value={infoFormData.name}
//                   onChange={onChange}
//                   onBlur={handleBlur}
//                   error={touchedInfo.name && Boolean(infoHelperTexts.name)}
//                   helperText={touchedInfo.name && infoHelperTexts.name}
//                 />
//               </Grid>
//
//               <Grid size={{xs: 12, md: 6}} width={'100%'}>
//                 <Typography
//                   sx={{fontWeight: 600, fontSize: 18}}
//                   color={'textPrimary'}>Email</Typography>
//                 <TextField
//                   fullWidth size={'small'} sx={{my: 1}}
//                   placeholder={'Nhập email của bạn'}
//
//                   name={'email'}
//                   value={infoFormData.email}
//                   onChange={onChange}
//                   onBlur={handleBlur}
//                   error={touchedInfo.email && Boolean(infoHelperTexts.email)}
//                   helperText={touchedInfo.email && infoHelperTexts.email}
//                 />
//               </Grid>
//             </Grid>
//           </Box>
//         </Paper>
//
//         <Paper sx={{
//           width: "100%",
//           borderRadius: "10px",
//           overflow: "hidden", // to remain effect of border-radius with child grid items
//           boxShadow: "0 0 2px #000000",
//           m: '40px auto 30px'
//         }}>
//
//           <Box component={'form'} sx={{width: '100%', p: 2}} onSubmit={onSubmitPassword}>
//             <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
//               <Typography
//                 component={'h2'} color={'primary'}
//                 sx={{fontWeight: 600, fontSize: 20}}>THAY ĐỔI MẬT KHẨU</Typography>
//               <Button
//                 variant={'contained'} size={'large'}
//                 sx={{fontWeight: 600, borderRadius: 2}}
//                 type={'submit'}>Lưu lại</Button>
//             </Box>
//
//             <Grid container spacing={3}>
//               <Grid size={{xs: 12, md: 6}} width={'100%'}>
//                 <Typography
//                   sx={{fontWeight: 600, fontSize: 18}}
//                   color={'textPrimary'}>Mật khẩu cũ</Typography>
//                 <TextField
//                   fullWidth size={'small'} sx={{my: 1}}
//                   placeholder={'Nhập mật khẩu cũ của bạn'}
//                   type={'password'}
//                   name={'old_password'}
//                   value={passwordFormData.old_password}
//                   onChange={onChange}
//                   onBlur={handleBlur}
//                   error={touchedPassword.old_password && Boolean(passwordHelperTexts.old_password)}
//                   helperText={touchedPassword.old_password && passwordHelperTexts.old_password}
//                 />
//               </Grid>
//
//               <Grid size={{xs: 12, md: 6}} width={'100%'}>
//               </Grid>
//
//               <Grid size={{xs: 12, md: 6}} width={'100%'}>
//                 <Typography
//                   sx={{fontWeight: 600, fontSize: 18}}
//                   color={'textPrimary'}>Mật khẩu mới</Typography>
//                 <TextField
//                   fullWidth size={'small'} sx={{my: 1}}
//                   placeholder={'Nhập mật khẩu mới của bạn'}
//                   type={'password'}
//                   name={'new_password'}
//                   value={passwordFormData.new_password}
//                   onChange={onChange}
//                   onBlur={handleBlur}
//                   error={touchedPassword.new_password && Boolean(passwordHelperTexts.new_password)}
//                   helperText={touchedPassword.new_password && passwordHelperTexts.new_password}
//                 />
//               </Grid>
//
//               <Grid size={{xs: 12, md: 6}} width={'100%'}>
//                 <Typography sx={{fontWeight: 600, fontSize: 18}}
//                             color={'textPrimary'}>Nhập lại mật khẩu mới</Typography>
//                 <TextField fullWidth size={'small'} sx={{my: 1}}
//                            placeholder={'Nhập lại mật khẩu mới của bạn'}
//                            type={'password'}
//
//                            name={'confirm_new_password'}
//                            value={passwordFormData.confirm_new_password}
//                            onChange={onChange}
//                            onBlur={handleBlur}
//                            error={touchedPassword.confirm_new_password && Boolean(passwordHelperTexts.confirm_new_password)}
//                            helperText={touchedPassword.confirm_new_password && passwordHelperTexts.confirm_new_password}
//                 />
//               </Grid>
//             </Grid>
//           </Box>
//         </Paper>
//       </Container>
//     </>
//   )
// }