import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/SideBar";
import Topbar from "./components/TopBar";
import { Box, useTheme, useMediaQuery } from "@mui/material";

export default function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Topbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          ml: isMobile ? "10px" : "210px", // 👉 hilangkan margin kiri di HP
          backgroundColor: "background.default",
          minHeight: "100vh",
        }}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/histori"
            element={<div>📜 Halaman Histori Pembelian</div>}
          />
          <Route path="/beli" element={<div>💳 Halaman Beli Paket</div>} />
        </Routes>
      </Box>
    </Box>
  );
}
