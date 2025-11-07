import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import WifiIcon from "@mui/icons-material/Wifi";
import PaymentIcon from "@mui/icons-material/Payment";
import BoltIcon from "@mui/icons-material/Bolt";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const currency = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);

export default function Dashboard({ user }) {
  const navigate = useNavigate();

  const [quotaData, setQuotaData] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // 🔹 Ambil data paket aktif user
  useEffect(() => {
    if (!user?.packageId) return;
    fetch(`http://localhost:3000/quotas/${user.packageId}`)
      .then((res) => res.json())
      .then(setQuotaData)
      .catch(() => setQuotaData(null));
  }, [user]);

  // 🔹 Data kuota untuk chart
  const usageData = [
    { name: "Kuota Terpakai", value: user?.quota?.used || 0 },
    {
      name: "Sisa Kuota",
      value: (user?.quota?.total || 0) - (user?.quota?.used || 0),
    },
  ];
  const COLORS = ["#1976d2", "#e0e0e0"];

  const handleBuy = () => {
    if (!quotaData) return;
    navigate("/payment", { state: { selectedPackage: quotaData } });
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
        p: { xs: 2, md: 4 },
      }}
    >
      <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* 🔹 Penggunaan Data */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2} mb={1}>
                <DataUsageIcon
                  color="info"
                  sx={{
                    fontSize: 36,
                    bgcolor: "#e3f2fd",
                    p: 1,
                    borderRadius: 2,
                  }}
                />
                <Typography variant="h6" fontWeight={600}>
                  Penggunaan Data
                </Typography>
              </Box>

              <Box sx={{ width: "100%", height: 200, position: "relative" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={usageData}
                      innerRadius={60}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {usageData.map((_, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>

                <Box
                  sx={{
                    position: "absolute",
                    top: "45%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h6" fontWeight={600}>
                    {`${Math.round(
                      (user.quota.used / user.quota.total) * 100
                    )}%`}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Terpakai
                  </Typography>
                </Box>
              </Box>

              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
              >
                {user.quota.used} / {user.quota.total} GB (Berlaku hingga: )
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* 🔹 Status Koneksi */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2} mb={1}>
                <WifiIcon
                  color={user.status === "Aktif" ? "success" : "warning"}
                  sx={{
                    fontSize: 36,
                    bgcolor: "#e8f5e9",
                    p: 1,
                    borderRadius: 2,
                  }}
                />
                <Box>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    color={
                      user.status === "Aktif" ? "success.main" : "warning.main"
                    }
                  >
                    Koneksi {user.status}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Terakhir dicek: 2 menit lalu
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="outlined"
                size="small"
                sx={{ mt: 1, borderRadius: 2 }}
              >
                Perbarui Status
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* 🔹 Ringkasan Paket */}
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2} mb={1}>
                <PaymentIcon
                  color="primary"
                  sx={{
                    fontSize: 36,
                    bgcolor: "#e3f2fd",
                    p: 1,
                    borderRadius: 2,
                  }}
                />
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    {quotaData ? quotaData.name : "Belum Ada Paket"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {quotaData
                      ? `Harga: ${currency(quotaData.price)} / ${
                          quotaData.validityDays
                        } Hari`
                      : "Silakan pilih paket terlebih dahulu"}
                  </Typography>
                </Box>
              </Box>

              <Button
                variant="contained"
                size="small"
                sx={{ borderRadius: 2 }}
                onClick={handleBuy}
              >
                {quotaData ? "Beli Lagi / Perpanjang Paket" : "Pilih Paket"}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
