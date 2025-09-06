import { Box } from "@mui/material";
import { memo } from "react";


const RequiredMark = () => {
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
}
export default memo(RequiredMark)