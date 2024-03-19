import Link from "next/link";
import { Form } from "./Form";
import { checkAuth } from "@/app/actions";
import { redirect } from "next/navigation";
import { Container, Typography, CssBaseline, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import HubIcon from '@mui/icons-material/Hub';

export default async function SignIn() {
  await checkAuth(async (auth) => {
    if (auth) {
      redirect("/admin");
    }
    return null;
  });

  return (
    <Container>
      <CssBaseline />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "100vh" }}
      >
        <Grid xs={10} md={6} lg={4}>
          <Box  marginBottom={4} sx={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: 2, alignItems: "center" }}>
            <HubIcon fontSize="large" color="primary" sx={{ fontSize: "56px" }}/>
            <Typography variant="h4" color="primary" sx={{fontWeight: "bold"}}>Jarvis</Typography>
          </Box>
          <Typography variant="h5">Sign In</Typography>
          <Form />
          <Typography variant="body2" marginTop={2} textAlign="end">
            Not a member? <Link href="/signup">Sign Up</Link>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
