import {Box, Card, CardMedia, Typography} from "@mui/material";

type LogoProps = {
  width?: number;       // width of logo (card)
  height?: number;      // height of logo
  fontSize?: string | number;
  mb?: number;          // margin-bottom
};

function Logo({ width = 40, height = 40, fontSize = '64px', mb = 2 }: LogoProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb}}>
      <Card sx={{ width, boxShadow: 'none', mr: 1 }}>
        <CardMedia
          component="img"
          image={"https://bk-exam-public.s3.ap-southeast-1.amazonaws.com/logo2.png"}
          alt="logo"
          title={'web logo'}
          sx={{ height, objectFit: 'contain'}}
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