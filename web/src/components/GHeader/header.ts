import {useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router";
import {deleteCookie} from "../../stores";
import {useParams} from "react-router-dom";
import {getMethod, getUserInfo, getValidAccessToken} from "../../utils";

interface UserBaseInfo {
  name: string;
  role: string;
  avatar_info: {
    id: number;
    url: string;
  } | null
}

const getRoleLabel = (role: string) => {
  switch (role) {
    case "admin":
      return "Admin";
    case "teacher":
      return "Giáo viên";
    case "student":
      return "Học sinh";
    default:
      return "Unknown";
  }
}

export default function useHeader() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleChangeProfile = () => {
    handleClose();
    navigate('/profile');
  }


  const handleLogout = async () => {
    if (window.confirm("Bạn có chắc muốn đăng xuất?")) {
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      navigate('/login');
    }
  }

  /************** Set classname, username, role label ****************/
  const [className, setClassName] = useState<string>("")
  const [user, setUser] = useState<UserBaseInfo>({name: "", role: "", avatar_info: null});
  const displayAddClassButton = user.role === "teacher" ? "inline-flex": "none"
  const {id: classId} = useParams();

  useEffect(() => {
    const onMounted = async () => {
      const accessToken: string | null = await getValidAccessToken()
      if (!accessToken) {
        console.error("Access token not found");
        navigate('/login');
        return;
      }

      try {
        const {name, role, avatar_info} = getUserInfo(accessToken);
        setUser({name, role, avatar_info});

        if (classId) {
          const {name} = await getMethod(`/classes/${classId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            }
          })
          setClassName(name)
        }
      } catch (err) {
        console.error("Error on loading data:", err);
      }
    }
    onMounted();
  }, [])

  /************** For mobile **************/
  const [mobileOpen, setMobileOpen] = useState<boolean>(false)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState: boolean) => !prevState);
  }

  const navItems = useMemo(() => [
    {
      text: "Trang chủ",
      path: `/classes`
    },
    {
      text: "Tổng quan",
      path: `/class/${classId}`
    },
    {
      text: "Bài Thi",
      path: `/class/${classId}/exam`
    },
    {
      text: "Thành viên",
      path: `/class/${classId}/member`
    }
  ], [classId])

  const isDisabledPath = (path: string) => {
    return (!classId && path.includes('/class'))
  }

  return {
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
  };
}