import {Box, Card, CardMedia, Typography} from "@mui/material";

type LogoProps = {
  width?: number;       // width of logo (card)
  height?: number;      // height of logo
  fontSize?: string | number;
  mb?: number;          // margin-bottom
};

function Logo({ width = 80, height = 60, fontSize = '64px', mb = 2 }: LogoProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb }}>
      <Card sx={{ width, boxShadow: 'none' }}>
        <CardMedia
          image={'/logo2.png'}
          title={'web logo'}
          sx={{ height }}
        />
      </Card>

      <Typography variant={'h2'} component={'span'}
                  sx={{ fontWeight: 'bold', color: "#173054", fontSize }}>
        BK
      </Typography>

      <Typography variant={'h2'} component={'span'}
                  sx={{ fontWeight: 'bold', color: "#f7a41d", fontSize }}>
        Star
      </Typography>
    </Box>
  );
}

export default Logo;