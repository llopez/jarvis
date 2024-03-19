import Link from "next/link";
import { checkAuth } from "@/app/actions";

import {
  AppBar,
  Button,
  Container,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { SignOutButton } from "./SignOutButton";

export default async function Home() {
  const user = await checkAuth(async (auth) => {
    if (auth) {
      return auth;
    }
    return null;
  });

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Jarvis
          </Typography>

          {user ? (
            <SignOutButton />
          ) : (
            <Link href="/signin" passHref>
              <Button sx={{ color: "white" }} variant="contained">
                Sign In
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
