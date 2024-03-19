import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  ListItemSecondaryAction,
} from "@mui/material";

import AcUnitIcon from "@mui/icons-material/AcUnit";
import OutletIcon from "@mui/icons-material/Outlet";
import WindPowerIcon from "@mui/icons-material/WindPower";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Link from "next/link";

const DeviceTypeListItem = ({ name }: { name: string }) => {
  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          LinkComponent={Link}
          href={`/admin/devices/new/${name}`}
        >
          <ListItemIcon>
            {name === "light" && <LightbulbIcon fontSize="large" />}
            {name === "aircon" && <AcUnitIcon fontSize="large" />}
            {name === "outlet" && <OutletIcon fontSize="large" />}
            {name === "fan" && <WindPowerIcon fontSize="large" />}
          </ListItemIcon>
          <ListItemText primary={name} />
          <ListItemSecondaryAction sx={{ display: "flex" }}>
            <KeyboardArrowRightIcon />
          </ListItemSecondaryAction>
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  );
};

const deviceTypes = ["light", "outlet", "aircon", "fan"];

export default function Page() {
  return (
    <>
      <List
        sx={{ maxHeight: "calc(100% - 56px)", overflow: "auto" }}
        disablePadding
      >
        {deviceTypes.map((name) => (
          <DeviceTypeListItem name={name} key={name} />
        ))}
      </List>
    </>
  );
}
