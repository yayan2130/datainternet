import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import History from "./pages/History";
import Purchase from "./pages/Purchase";
import Payment from "./pages/Payment";
import Sidebar from "./components/SideBar";
import Topbar from "./components/TopBar";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";

export default function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isLogin = !!user;

  return (
    <Box sx={{ display: "flex" }}>
      {isLogin && <Sidebar />}
      {isLogin && <Topbar onLogout={handleLogout} user={user} />}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: isLogin ? 8 : 0,
          ml: isLogin ? (isMobile ? "0" : "240px") : 0,
          backgroundColor: "background.default",
          minHeight: "100vh",
        }}
      >
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/"
            element={
              isLogin ? (
                <Dashboard user={user} />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              isLogin ? (
                <Dashboard user={user} />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/history"
            element={
              isLogin ? (
                <History user={user} />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/purchase"
            element={
              isLogin ? (
                <Purchase user={user} />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route path="/payment" element={
              isLogin ? (
                <Payment user={user} />
              ) : (
                <Login onLogin={handleLogin} />
              )
            } />
        </Routes>
      </Box>
    </Box>
  );
}
