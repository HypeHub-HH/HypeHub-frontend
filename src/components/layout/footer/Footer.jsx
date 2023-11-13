import Grid from '@mui/material/Grid';
import AboutUs from './AboutUs';
import Hello from './Hello';
import { Container, Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#E6ECF3',
        p: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5} display={'flex'} justifyContent={'center'} alignSelf={'center'}>
          <Grid item xs={12} sm={9}>
            <Hello />
          </Grid>
          <Grid item xs={12} sm={3}>
            <AboutUs />
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            Copyright © HypeHub {new Date().getFullYear()}.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
