"use client";

import { styled, useTheme } from "@mui/material/styles";

import {
  Box,
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  Avatar,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemIcon from "@mui/material/ListItemIcon";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HubIcon from "@mui/icons-material/Hub";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";

import { useState } from "react";
import Link from "next/link";
import { removeSession } from "@/app/actions";
import { UserType } from "@/models/User";
import { usePathname } from "next/navigation";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export const App = ({
  children,
  user,
}: Readonly<{
  children: React.ReactNode;
  user: UserType | null;
}>) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const path = usePathname();

  const title = () => {
    if (path === "/admin/devices") return "Devices";
    if (path === "/admin") return "Dashboard";
    if (path === "/admin/devices/new") return "Add Device";
    if (path === "/admin/devices/new/light") return "Add Light";
    return "";
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {title()}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="temporary"
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
      >
        <DrawerHeader>
          <Box
            padding={1}
            display="flex"
            gap={1}
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <HubIcon />
            <Typography variant="overline" pt={1} fontWeight="bold">
              Jarvis
            </Typography>
          </Box>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box onClick={handleDrawerClose}>
          <List>
            <ListItem key="profile" disablePadding sx={{height: 70}}>
              <ListItemButton disableRipple>
                <ListItemIcon>
                  <Avatar sx={{ width: 40, height: 40, ml: "-6px" }} />
                </ListItemIcon>
                <ListItemText primary={user && user.email.split("@")[0]} />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem key="dashboard" disablePadding>
              <ListItemButton LinkComponent={Link} href="/admin">
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            <ListItem key="devices" disablePadding>
              <ListItemButton LinkComponent={Link} href="/admin/devices">
                <ListItemIcon>
                  <HubIcon />
                </ListItemIcon>
                <ListItemText primary="Devices" />
              </ListItemButton>
            </ListItem>
            <ListItem key="settings" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem key="signout" disablePadding>
              <ListItemButton
                onClick={() => {
                  removeSession();
                }}
              >
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Sign Out" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box width="100%">
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};
