import {useState} from "react";
import {logout} from "../../pages/Login/common.tsx";
import {toast} from "react-toastify";

export function useHeader() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }
  const handleLogout = () => {
    toast.success('Đăng xuất thành công')
    logout()
  };

  return { anchorEl, setAnchorEl, open, handleClose, handleLogout, handleClick };
}