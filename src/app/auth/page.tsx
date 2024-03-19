import { checkAuth } from "@/app/actions";
import { redirect } from "next/navigation";
import { User } from "@/models/User";
import crypto from "crypto";
import { revalidatePath } from "next/cache";
import { Box, Button, Container, CssBaseline, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import HubIcon from "@mui/icons-material/Hub";

export const dynamic = "force-dynamic";

export default async function Authorize({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const checkParams = async (): Promise<boolean> => {
    "use server";

    console.log("searchParams", searchParams);

    if (searchParams.client_id !== process.env.GOOGLE_CLIENT_ID) {
      return false;
    }

    if (
      searchParams.redirect_uri !==
      "https://oauth-redirect.googleusercontent.com/r/jarvis-414915"
    ) {
      return false;
    }
    return true;
  };

  const valid = await checkParams();

  if (!valid) {
    return (
      <>
        <Typography variant="h5">Google Application Misconfigured</Typography>
        <Typography variant="body1">update google action</Typography>
      </>
    );
  }

  const user = await checkAuth(async (auth) => {
    if (auth) {
      return auth;
    }

    const carryOnParams = new URLSearchParams(searchParams).toString();

    redirect("/auth/signin?".concat(carryOnParams));
  });

  const allow = async () => {
    "use server";

    const authorizationCode = crypto.randomBytes(64).toString("hex");

    if (!user) return;

    await User.updateOne({ _id: user._id }, { authorizationCode });

    const { redirect_uri, state } = searchParams;

    const queryParams = new URLSearchParams({
      state,
      code: authorizationCode,
    }).toString();

    redirect(redirect_uri.concat("?").concat(queryParams));
  };

  const deny = async () => {
    "use server";

    if (!user) return;

    await User.updateOne({ _id: user._id }, { authorizationCode: null });

    revalidatePath("/auth");
  };

  return (
    <Container>
      <CssBaseline />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        sx={{ minHeight: "100vh" }}
        gap={2}
      >
        <Grid xs={10} md={6} lg={4}>
          <Box
            marginBottom={2}
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
        </Grid>
        <Grid>
          <Typography variant="h5" textAlign="center">
            Authorize Google
          </Typography>
        </Grid>
        <Grid>
          {!!user?.authorizationCode && (
            <form action={deny}>
              <Button variant="contained">Revoke</Button>
            </form>
          )}

          {!user?.authorizationCode && (
            <form action={allow}>
              <Button type="submit" variant="contained">
                Grant
              </Button>
            </form>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
