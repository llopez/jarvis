"use client";

import { removeSession } from "./actions";
import { Button } from "@mui/material";

export const SignOutButton = () => {
  return (
    <Button
      sx={{ color: "white" }}
      variant="contained"
      onClick={() => {
        removeSession();
      }}
    >
      Sign Out
    </Button>
  );
};
