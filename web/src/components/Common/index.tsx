import { Box } from "@mui/material";
import { memo } from "react";

// Star required
export const RequiredMark = memo(() => {
  return (
    <Box
      component="span"
      sx={{
        color: 'error.main',
        ml: 0.5,
        fontSize: '1rem',
        verticalAlign: 'super'
      }}
    >
      *
    </Box>
  )
})