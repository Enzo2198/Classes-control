import "./style.css"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Stack from '@mui/material/Stack';
import {
  Button, Box, Menu, MenuItem, type MenuProps, styled, alpha,
  Avatar, Drawer, List, ListItemButton, ListItemText, IconButton
} from "@mui/material"

import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutIcon from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import Typography from "@mui/material/Typography";
import {Link, useNavigate} from "react-router";
import {useClassPage} from "../../pages/Classes/classes.tsx";
import useHeader from "./header.ts";
import {AvatarDefault} from "../index.tsx";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({theme}) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: 'rgb(55, 65, 81)',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
    ...theme.applyStyles('dark', {
      color: theme.palette.grey[300],
    }),
  },
}));


export default () => {
  const navigate = useNavigate();
  const {toAddCourseClick} = useClassPage()
  const drawerWidth = 240;
  const {
    user,
    anchorEl,
    open,
    handleClose,
    handleChangeProfile,
    handleLogout,
    handleClick,
    getRoleLabel,
    className,
    displayAddClassButton,
    mobileOpen,
    handleDrawerToggle,
    navItems,
    isDisabledPath
  } = useHeader()

  const drawer = (
    <Box>
      <Box sx={{p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Box sx={{p: '10px'}}/>
        <Box>
          <img src="https://bk-exam-public.s3.ap-southeast-1.amazonaws.com/logo2.png"
               alt="logo" width="40" height="40"/>
        </Box>
        <button onClick={handleDrawerToggle} style={{border: 'none', background: 'none', cursor: 'pointer'}}>
          <CloseIcon/>
        </button>
      </Box>
      <Divider/>
      <List component={'nav'}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={Link}
            to={item.path}
            onClick={handleDrawerToggle}
            sx={{textAlign: 'center'}}
            disabled={isDisabledPath(item.path)}
          >
            <ListItemText primary={item.text}/>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box className={"header"}>
      <Box className={"header-logo"}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{mr: 2, display: {md: 'none'}}}
        >
          <MenuIcon/>
        </IconButton>

        <Box sx={{display: {xs: 'none', lg: 'block'}}}>
          <img src="https://bk-exam-public.s3.ap-southeast-1.amazonaws.com/logo2.png"
               alt="logo" width="40" height="40"/>
        </Box>

        <Box className={"logo-text"}>
          <Box style={{display: 'flex'}}>
            <p style={{color: '#0b3d91'}}>BK</p>
            <p style={{color: '#ff991c'}}>Star</p>
          </Box>
          <Box style={{fontSize: 12}}>Classroom</Box>
        </Box>
      </Box>

      <Box sx={{position: 'relative', left: '130px', display: {xs: 'none', md: 'block'}}}>
        <Typography sx={{fontWeight: 600, fontSize: '1.2rem'}}>
          {className}
        </Typography>
      </Box>

      <Stack direction="row" spacing={2}>
        <Button
          sx={{
            fontWeight: 700,
            '&:hover': {
              borderColor: '#1976d2',
              backgroundColor: 'rgba(25, 118, 210, 0.04)'
            },
            display: displayAddClassButton,
          }}
          variant="outlined"
          startIcon={<AddIcon/>}
          onClick={toAddCourseClick}
        >
          Tạo lớp
        </Button>
        <Button
          sx={{fontWeight: 700}}
          onClick={() => navigate('/classes')}
          variant="text"
          startIcon={<HomeIcon/>}
        >
          Trang chủ

        </Button>

        <Box sx={{flexGrow: 0, ml: 2, display: 'flex', alignItems: 'center'}}>

          <Button
            id="demo-customized-button"
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            disableElevation
            onClick={handleClick}
            sx={{
              textTransform: 'none',
              padding: '6px 12px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            {
              user.avatar_info !== null
                ? <Avatar sx={{width: 36, height: 36, mr: 1}} src={user.avatar_info.url}/>
                : <AvatarDefault fullName={user.name} width={36} height={36} mr={1}/>
            }

            <Box sx={{textAlign: 'left'}}>
              <Typography sx={{fontWeight: 500, color: '#5f6368'}}>
                {user.name}
              </Typography>
              <Typography variant="caption" sx={{color: '#5f6368'}}>
                {getRoleLabel(user.role)}
              </Typography>
            </Box>
            <KeyboardArrowDownIcon sx={{color: '#5f6368', ml: 1}}/>
          </Button>

          <StyledMenu
            id="demo-customized-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleChangeProfile} disableRipple>
              <PermIdentityIcon/>
              Thông tin cá nhân
            </MenuItem>
            <Divider sx={{my: 0.5}}/>
            <MenuItem onClick={handleLogout} disableRipple>
              <LogoutIcon/>
              Đăng xuất
            </MenuItem>
          </StyledMenu>
        </Box>
      </Stack>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: 'block',
            // display: {xs: 'block', sm: 'none'},
            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
          }}
        >
          {drawer}
        </Drawer>
      </nav>

    </Box>
  )
}

