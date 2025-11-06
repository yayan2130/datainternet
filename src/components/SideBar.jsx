import { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
  Fade,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import WifiIcon from "@mui/icons-material/Wifi";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => () => setOpen(state);

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Histori Pembelian", icon: <AccessTimeIcon />, path: "/histori" },
    { text: "Beli Paket", icon: <ShoppingCartIcon />, path: "/beli-paket" },
  ];
  const drawerContent = (
    <Box sx={{ width: 240 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          borderBottom: "1px solid #eee",
          gap: 1,
        }}
      >
        <WifiIcon color="primary" />
        <Typography variant="h6" fontWeight={600}>
          Data Tracker
        </Typography>
      </Box>

      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            onClick={isMobile ? toggleDrawer(false) : undefined}
          >
            <ListItemIcon
              sx={{
                color:
                  location.pathname === item.path ? "primary.main" : "inherit",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontWeight: location.pathname === item.path ? 600 : 400,
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {isMobile && (
        <Fade in={!open}>
          <IconButton
            color="inherit"
            onClick={toggleDrawer(true)}
            sx={{
              position: "fixed",
              top: 9,
              left: 16,
              zIndex: 1300,
              backgroundColor: "#fff",
              boxShadow: 2,
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            <MenuIcon />
          </IconButton>
        </Fade>
      )}

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? open : true}
        onClose={toggleDrawer(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
