import Link from "next/link";
import { Form } from "./Form";
import { login } from "./actions";
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import HubIcon from '@mui/icons-material/Hub';

export const dynamic = "force-dynamic";

export default async function SignIn({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const carryOnParams = new URLSearchParams(searchParams).toString();

  const loginWithRedirect = async (uri: string) => {
    return async (prevState: any, data: FormData) => {
      "use server";
      return await login(data, uri);
    };
  };

  const action = await loginWithRedirect("/auth?".concat(carryOnParams));

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
          <Box
            marginBottom={4}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: 2,
              alignItems: "center",
            }}
          >
            <HubIcon
              fontSize="large"
              color="primary"
              sx={{ fontSize: "56px" }}
            />
            <Typography
              variant="h4"
              color="primary"
              sx={{ fontWeight: "bold" }}
            >
              Jarvis
            </Typography>
          </Box>
          <Typography variant="h5">Sign In</Typography>
          <Form action={action} />
          <Typography variant="body2" marginTop={2} textAlign="end">
            Not a member? <Link href="/signup">Sign Up</Link>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
