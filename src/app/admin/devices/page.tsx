import { Device, Device__Type } from "@/models/Device";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Fab,
  IconButton,
  ListItemSecondaryAction,
} from "@mui/material";

import LightbulbIcon from "@mui/icons-material/Lightbulb";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";

type DeviceListItemProps = {
  device: Device__Type;
};

const DeviceListItem = (props: DeviceListItemProps) => {
  const { device } = props;
  const { name, room, states } = device;
  const { on } = states;

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <LightbulbIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText primary={name} secondary={room} />
          <ListItemSecondaryAction sx={{ display: "flex" }}>
            {on ? "ON" : "OFF"}
          </ListItemSecondaryAction>
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  );
};

export default async function Page() {
  const devices = await Device.find<Device__Type>();

  return (
    <>
      <List
        sx={{ maxHeight: "calc(100% - 56px)", overflow: "auto" }}
        disablePadding
      >
        {devices.map((device) => (
          <DeviceListItem device={device} key={device._id} />
        ))}
      </List>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 16, right: 16, opacity: 0.8 }}
      >
        <IconButton LinkComponent={Link} href="/admin/devices/new">
          <AddIcon sx={{color: "white"}}/>
        </IconButton>
      </Fab>
    </>
  );
}
