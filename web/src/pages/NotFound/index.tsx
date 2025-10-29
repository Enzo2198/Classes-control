import {Button, Typography, Container, Paper} from "@mui/material";
import {Home as HomeIcon, ArrowBackOutlined as BackPageIcon} from "@mui/icons-material";
import {useNavigate} from "react-router";

export default function NotFound() {
  const navigate = useNavigate();
  const onGoBack = () => {
    navigate('/classes');
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 6,
          textAlign: 'center',
          borderRadius: 4,
          maxWidth: 500,
          width: '100%'
        }}
      >
        {/* Title */}
        <Typography
          component="h1"
          variant="h3"
          fontWeight="bold"
          sx={{mb: 2, color: 'red'}}
        >
          404 - Không tìm thấy trang!
        </Typography>

        {/* Description */}
        <Typography
          component="p"
          variant="h6"
          sx={{
            mb: 4,
            lineHeight: 1.6,
            maxWidth: '80%',
            mx: 'auto'
          }}
        >
          Oops! Trang web bạn tìm không tồn tại
        </Typography>

        {/* Action Button */}
        <Button
          variant="contained"
          size="large"
          startIcon={<HomeIcon />}
          onClick={onGoBack}
          sx={{
            px: 4,
            py: 1.5,
            mr: 4,
            borderRadius: 3,
            fontSize: '1.1rem',
            fontWeight: 'bold',
            textTransform: 'none',
            '&:hover': {
              transform: 'translateY(-2px)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          Về trang chủ
        </Button>

        <Button
          variant="contained"
          size="large"
          startIcon={<BackPageIcon />}
          onClick={() => navigate(-1)}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 3,
            fontSize: '1.1rem',
            fontWeight: 'bold',
            textTransform: 'none',
            '&:hover': {
              transform: 'translateY(-2px)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          Quay lại
        </Button>

        {/* Additional Help Text */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 3,
            fontSize: '0.9rem'
          }}
        >
          If you believe this is an error, please contact support
        </Typography>
      </Paper>
    </Container>
  )
}