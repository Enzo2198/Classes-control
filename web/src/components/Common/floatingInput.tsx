import {Box, IconButton, InputAdornment, TextField} from "@mui/material";
import {useState} from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import * as React from "react";

interface FloatingInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export default function FloatingInput(
  {
    label,
    name,
    type = "text",
    value,
    onChange,
    error
  }: FloatingInputProps) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const inputType = show && isPassword ? "text" : type;

  const handleToggleVisibility = () => {
    setShow(prev => !prev);
  }

  const handleMouseDownPassword = (e: React.MouseEvent) => {
    e.preventDefault();
  }


  return (
    <>
      <Box position="relative" mt={4}>
        <TextField
          id={`${name}-input`}
          name={name}
          type={inputType}
          label={label}
          value={value}
          onChange={onChange}
          variant="outlined"
          fullWidth
          error={!!error}
          helperText={error}
          slotProps={{
            input: {
              endAdornment: isPassword ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={handleToggleVisibility}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {show ? <LuEye /> : <LuEyeOff />}
                  </IconButton>
                </InputAdornment>
              ) : undefined,
            }
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: error ? "error.main" : "primary.light",
              },
              "&:hover fieldset": {
                borderColor: error ? "error.main" : "primary.main",
              },
              "&.Mui-focused fieldset": {
                borderColor: error ? "error.main" : "primary.main",
              },
            },
            "& .MuiFormHelperText-root": {
              marginLeft: 0,
              marginRight: 0,
            }
          }}
        />
      </Box>
    </>
  );
}