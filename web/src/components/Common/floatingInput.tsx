import {Box, IconButton, TextField} from "@mui/material";
import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

interface FloatingInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export default function FloatingInput({label, name, type = "text", value, onChange, error,}: FloatingInputProps) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const inputType = show && isPassword ? "text" : type;

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
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={() => setShow(!show)}
                  edge="end"
                >
                  {show ? <LuEye /> : <LuEyeOff />}
                </IconButton>
              ) : undefined,
            }
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "primary.light",
              },
              "&:hover fieldset": {
                borderColor: "primary.main",
              },
              "&.Mui-focused fieldset": {
                borderColor: "primary.main",
              },
            },
          }}
        />
      </Box>
    </>
  );
}