"use client";

import { register } from "./actions";
import { useRef } from "react";
import { SubmitButton } from "./Button";
import { useFormState } from "react-dom";
import { TextField, Alert } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export const Form = () => {
  const ref = useRef<HTMLFormElement>(null);
  const [state, action] = useFormState(
    async (prevState: any, data: FormData) => {
      const result = await register(prevState, data);

      if (!result) {
        ref.current?.reset();
      }

      return result;
    },
    undefined
  );

  return (
    <form action={action} ref={ref}>
      <Grid container spacing={2} direction="column">
        <Grid>
          {state?.error && (
            <Alert variant="outlined" severity="error" sx={{ marginTop: 2 }}>
              {state.error}
            </Alert>
          )}
        </Grid>
        <Grid>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            autoComplete="email"
            required
            fullWidth
          />
        </Grid>
        <Grid>
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            autoComplete="off"
            required
            fullWidth
          />
        </Grid>
        <Grid>
          <TextField
            id="password-confirmation"
            name="password-confirmation"
            type="password"
            label="Password Confirmation"
            autoComplete="off"
            required
            fullWidth
          />
        </Grid>
        <Grid textAlign="end">
          <SubmitButton />
        </Grid>
      </Grid>
    </form>
  );
};
