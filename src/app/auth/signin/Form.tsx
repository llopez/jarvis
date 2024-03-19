"use client";

import { useFormState } from "react-dom";
import { LoginResponseType } from "./actions";
import { Button, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export const Form = ({
  action,
}: {
  action: (prevState: any, data: FormData) => Promise<LoginResponseType>;
}) => {
  const [state, login] = useFormState(action, {
    error: "",
  });

  return (
    <form action={login}>
      <Grid container direction="column" spacing={2}>
        <Grid>{state?.error}</Grid>
        <Grid>
          <TextField
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            variant="outlined"
            label="email"
            fullWidth
            size="medium"
          />
        </Grid>
        <Grid>
          <TextField
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            variant="outlined"
            label="password"
            fullWidth
            size="medium"
          />
        </Grid>
        <Grid textAlign="end">
          <Button type="submit" variant="contained">
            Sign In
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
