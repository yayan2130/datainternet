import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  TextField,
  Alert,
} from "@mui/material";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(
        `http://localhost:3000/users?email=${email}&password=${password}`
      );
      const data = await res.json();

      if (data.length > 0) {
        onLogin(data[0]); // kirim data user ke App.jsx
      } else {
        setError("Email atau password salah!");
      }
    } catch (err) {
      console.error(err);
      setError("Gagal menghubungi server.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
      }}
    >
      <Paper sx={{ p: 4, width: 360, textAlign: "center" }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Masuk ke Akun Anda
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            fullWidth
            sx={{ mb: 2 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            sx={{ mb: 2 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Button variant="contained" fullWidth type="submit">
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
