import type {ChangeEvent, FormEvent} from "react";
import {Box, Button, Container, Paper, TextField, Typography} from "@mui/material";
import Logo from "../../components/Common/logo.tsx";
import { ArrowBackOutlined } from "@mui/icons-material";
import {useNavigate} from "react-router";

interface FieldConfig {
  name: string;
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
}

interface SimpleAuthFormProps {
  title: string;
  buttonText: string;
  noteText?: string;
  disabled?: boolean;
  fields: FieldConfig[];
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export default function SimpleAuthForm({title, buttonText, noteText, fields, onSubmit, disabled}: SimpleAuthFormProps) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/login");
    }
  };

  return (
    <Container sx={styles.container}>
      <Paper sx={styles.paper}>
        <Box sx={styles.content}>
          <Logo width={60} height={60}/>
          <Typography variant="h4" sx={styles.title}>
            {title}
          </Typography>

          <form style={{width: '100%'}} onSubmit={onSubmit} autoComplete="off">

            {fields.map((field) => (
              <TextField
                fullWidth
                size="small"
                type={field.type}
                sx={{my: 1}}
                placeholder={field.placeholder}
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                autoComplete={field.autoComplete}
              />
            ))}

            <Typography
              variant="body2"
              sx={{
                color: "black",
                fontSize: "0.9rem",
                mt: 2
              }}
            >
              {noteText}
            </Typography>

            <Box display="flex" justifyContent="space-between" gap = {2}>
              <Button
                size="large"
                variant="outlined"
                fullWidth
                onClick={handleGoBack}
                disabled={disabled}
                sx={{borderRadius: 2, mt: 2}}>
                <ArrowBackOutlined/>
                Quay lại
              </Button>
              <Button
                size="large" variant="contained" fullWidth type="submit" disabled={disabled}
                sx={{borderRadius: 2, mt: 2}}>
                {buttonText}
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>
    </Container>
  )
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