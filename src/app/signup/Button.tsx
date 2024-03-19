'use client';

import { useFormStatus } from "react-dom";
import { Button } from "@mui/material";

export const SubmitButton = () => {
  const { pending } = useFormStatus()

  return (
    <Button
      disabled={pending}
      type="submit"
      variant="contained"
    >
      { pending ? 'Signing Up' : 'Sign Up' }
    </Button>
  )
}