import "./style.css"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Stack from '@mui/material/Stack';
import {Button, Box, Menu, MenuItem, type MenuProps, styled, alpha, Avatar} from "@mui/material"

import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutIcon from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import {useState} from "react";
import Typography from "@mui/material/Typography";
import {logout} from "../../pages/Login/common.tsx";
import {toast} from "react-toastify";

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
))(({ theme }) => ({
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }
  const handleLogout = () => {
    logout()
    toast.success('Logouted')
  };


  return (
    <>
      <Box className={"header"}>
        <Box className={"header-logo"}>
          <Box><img src="https://bk-exam-public.s3.ap-southeast-1.amazonaws.com/logo2.png" alt="logo" width="40"
                    height="40"/></Box>

          <Box className={"logo-text"}>
            <Box style={{display: 'flex'}}>
              <p>BK</p>
              <p style={{color: '#ff991c'}}>Star</p>
            </Box>
            <Box style={{fontSize: 12}}>Classroom</Box>
          </Box>
        </Box>

        <Stack  direction="row" spacing={2}>
          <Button sx={{fontWeight: 700}} variant="outlined"  startIcon={<AddIcon/>}>Tạo lớp</Button>
          <Button sx={{fontWeight: 700}} variant="text" startIcon={<HomeIcon/>}>Trang chủ</Button>

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
              <Avatar
                alt="Trần Xuân Bằng"
                src="https://i.pravatar.cc/40?u=tranxuanbang"
                sx={{ width: 36, height: 36 }}
              />
              <Box sx={{ textAlign: 'left' }}>
                <Typography sx={{ fontWeight: 500, color: '#5f6368' }}>
                  Trần Xuân Bảng
                </Typography>
                <Typography variant="caption" sx={{ color: '#5f6368' }}>
                  Giáo viên
                </Typography>
              </Box>
              <KeyboardArrowDownIcon sx={{ color: '#5f6368', ml: 1 }} />
            </Button>

            <StyledMenu
              id="demo-customized-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem disableRipple>
                <PermIdentityIcon />
                Thông tin cá nhân
              </MenuItem>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem onClick={handleLogout} disableRipple>
                <LogoutIcon />
                Đăng xuất
              </MenuItem>
            </StyledMenu>
          </Box>
        </Stack>

      </Box>
    </>
  )
}
