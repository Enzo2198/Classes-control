import {Box, Button, Container, Paper, TextField, Typography} from "@mui/material";
import {useInvite} from "./invite.ts";
import {Loading} from "../../components";
import Logo from "../../components/Common/logo.tsx";

function UnAuthorizedPage({ navigate }: { navigate: any }) {
  return (
    <Box sx={styles.fullScreen}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h6">Bạn chưa đăng nhập, vui lòng đăng nhập để tham gia lớp học</Typography>
        <Button variant="contained" sx={{ mt: 2, p: 2 }} onClick={() => navigate("/login")}>
          Quay về trang đăng nhập
        </Button>
      </Box>
    </Box>
  );
}

function AlreadyInClassPage({ navigate, classId }: { navigate: any; classId: string | null }) {
  return (
    <Box sx={styles.fullScreen}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h6">Bạn đã tham gia lớp học này rồi</Typography>
        <Button variant="contained" sx={{ mt: 2, p: 2 }} onClick={() => navigate(`/class/${classId}`)}>
          Đi tới lớp học
        </Button>
      </Box>
    </Box>
  );
}

export default function Invite() {
  const {
    navigate,
    classId,
    isCheckingAuth,
    isAuthenticated,
    isInClass,
    inputCode,
    setInputCode,
    onSubmit,
  } = useInvite();

  if (isCheckingAuth) return <Loading />;
  if (!isAuthenticated) return <UnAuthorizedPage navigate={navigate} />;
  if (isInClass) return <AlreadyInClassPage navigate={navigate} classId={classId} />;

  return (
    <Container maxWidth={false} sx={styles.container}>
      <Paper sx={styles.paper}>
        <Box sx={styles.content}>
          <Logo width={60} height={60} />
          <Typography variant="h4" sx={styles.title}>
            Tham gia lớp học
          </Typography>

          <Box component="form" sx={{ width: "100%" }} onSubmit={onSubmit}>

            <TextField
              fullWidth
              size="small"
              sx={{ my: 1 }}
              placeholder="Vui lòng nhập mã bảo vệ"
              name="inputCode"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
            />

            <Button size="large" variant="contained" fullWidth sx={{ fontWeight: 600, borderRadius: 2, mt: 2 }} type="submit">
              Tham gia lớp học
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

const styles = {
  fullScreen: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#f0f2f5",
    minHeight: "100vh",
    p: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    width: "100%",
    maxWidth: "500px",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 0 10px #000000",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    p: 3,
  },
  title: {
    fontWeight: "bold",
    mb: 1,
    color: "text.primary",
    textAlign: "center",
  },
};