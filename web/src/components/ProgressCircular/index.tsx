import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
      <Box>
        <Box sx={{textAlign: 'center'}}>
          <CircularProgress size={150}/>
        </Box>

        <Box sx={{mt: 2, fontSize: 26, fontWeight: 'bold'}}>
          Vui lòng chờ trong giây lát ...!
        </Box>
      </Box>
    </Box>
  );
}