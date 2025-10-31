import {Box, Card, CardMedia, Typography} from "@mui/material";

type LogoProps = {
  width?: number;       // width of logo (card)
  height?: number;      // height of logo
  fontSize?: string | number;
  mb?: number;          // margin-bottom
};

function Logo({ width = 40, height = 40, fontSize = '64px' }: LogoProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center'}}>
      <Card sx={{ width, boxShadow: 'none', mr: 1 }}>
        <CardMedia
          component="img"
          image={"/Logo.png"}
          alt="logo"
          title={'web logo'}
          sx={{ height, objectFit: 'contain'}}
          style={{display: "block"}}
        />
      </Card>

      <Typography variant={'h2'} component={'span'}
                  sx={{ fontWeight: 'bold', color: "primary.main", fontSize }}>
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