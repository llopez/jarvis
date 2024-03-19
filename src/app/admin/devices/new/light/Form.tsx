"use client";

import { useFormState } from "react-dom";
import {
  TextField,
  Alert,
  Button,
  Typography,
  Box,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { create } from "@/app/admin/devices/new/light/actions";
import { redirect } from "next/navigation";
import { Device_Room__Type } from "@/models/Device";
import { useState } from "react";
import { Device_Trait__Type } from "@/types";

const rooms: Device_Room__Type[] = [
  "Living Room",
  "Bedroom",
  "Kitchen",
  "Backyard",
  "Lung",
];

export const Form = () => {
  const [onOffTrait, setOnOffTrait] = useState<boolean>(true);
  const [brightnessTrait, setBrightnessTrait] = useState<boolean>(false);
  const [room, setRoom] = useState<string>("");

  const [state, action] = useFormState(
    async (prevState: any, data: FormData) => {
      if (onOffTrait) data.append("traits[]", Device_Trait__Type.OnOff);
      if (brightnessTrait)
        data.append("traits[]", Device_Trait__Type.Brightness);

      if (room) data.set("room", room);

      const result = await create(prevState, data);

      if (!result) {
        redirect("/admin/devices");
      }

      return result;
    },
    undefined
  );

  return (
    <form action={action}>
      <Grid
        container
        spacing={2}
        direction="column"
        margin={0}
        padding={2}
        sx={{ height: "calc(100vh - 64px)" }}
      >
        <Grid display="flex" alignItems="center">
          <LightbulbIcon
            fontSize="large"
            sx={{ width: 8 * 10, height: 8 * 10 }}
          />
          <Box alignItems="center" display="flex" flexDirection="column">
            <Typography variant="h5">Light</Typography>
            <Typography variant="overline">on/off</Typography>
          </Box>
        </Grid>
        <Divider />
        <Grid>
          {state?.error && (
            <Alert variant="outlined" severity="error" sx={{ marginTop: 2 }}>
              {state.error}
            </Alert>
          )}
        </Grid>
        <Grid>
          <Typography variant="overline">Attributes</Typography>
        </Grid>
        <Grid>
          <TextField id="name" name="name" label="name" required fullWidth />
        </Grid>
        <Grid>
          <TextField id="id" name="id" label="id" required fullWidth />
        </Grid>
        <Grid>
          <FormControl fullWidth>
            <InputLabel id="room" required>
              Room
            </InputLabel>
            <Select
              labelId="room"
              value={room}
              onChange={(e) => {
                console.log(e);
                setRoom(e.target.value);
              }}
            >
              {rooms.map((r) => (
                <MenuItem value={r} key={r}>
                  {r}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid>
          <Typography variant="overline">Capabilities</Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => {
                    setOnOffTrait((prev) => !prev);
                  }}
                  value={onOffTrait}
                  checked={onOffTrait}
                  disabled
                />
              }
              label="OnOff"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => {
                    setBrightnessTrait((prev) => !prev);
                  }}
                  value={brightnessTrait}
                />
              }
              label="Brightness"
            />
          </FormGroup>
        </Grid>
        <Grid flexGrow={1} alignItems="end" display="flex">
          <Button variant="contained" fullWidth type="submit">
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
