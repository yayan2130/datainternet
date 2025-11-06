import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import WifiIcon from "@mui/icons-material/Wifi";
import PaymentIcon from "@mui/icons-material/Payment";
import BoltIcon from "@mui/icons-material/Bolt";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function Dashboard({ user }) {
  const theme = useTheme();

  const usageData = [
    { name: "Kuota Terpakai", value: user.quota.used },
    { name: "Sisa Kuota", value: user.quota.total - user.quota.used },
  ];
  const COLORS = ["#1976d2", "#e0e0e0"];

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
        {/* Penggunaan Data */}
        <Grid item xs={12} md={12} lg={12}>
          <Card sx={{ borderRadius: 3, height: "100%" }}>
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

              <Box
                sx={{
                  width: "100%",
                  height: 200,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={usageData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {usageData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <Box sx={{ position: "absolute", textAlign: "center" }}>
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
                {user.quota.used} / {user.quota.total} GB (Reset:{" "}
                {user.nextBilling})
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Status Koneksi */}
        <Grid item xs={12} md={4} lg={4}>
          <Card sx={{ borderRadius: 3, height: "100%" }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2} mb={1}>
                <WifiIcon
                  color={user.status == "Aktif" ? "success" : "warning"}
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
                      user.status == "Aktif" ? "success.main" : "warning.main"
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

        {/* Ringkasan Tagihan */}
        <Grid item xs={12} md={4} lg={4}>
          <Card sx={{ borderRadius: 3, height: "100%" }}>
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
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(user.lastBill.amount)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Jatuh Tempo:{" "}
                    {new Intl.DateTimeFormat("id-ID", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }).format(new Date(user.lastBill.dueDate))}
                  </Typography>
                </Box>
              </Box>
              <Typography
                variant="body2"
                color="success.main"
                fontWeight={600}
                sx={{ mb: 1 }}
              >
                ✅ Lunas
              </Typography>
              <Button variant="outlined" size="small" sx={{ borderRadius: 2 }}>
                Lihat Riwayat Tagihan
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Detail Paket Saya */}
        <Grid item xs={12} md={4} lg={4} sx={{ height: "100%" }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2} mb={1}>
                <BoltIcon
                  color="warning"
                  sx={{
                    fontSize: 36,
                    bgcolor: "#fff8e1",
                    p: 1,
                    borderRadius: 2,
                  }}
                />
                <Typography variant="h6" fontWeight={600}>
                  Paket Saya
                </Typography>
              </Box>
              <Typography variant="body1" fontWeight={500}>
                {user.package}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Kecepatan: {user.speed}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Perpanjangan berikutnya:
                {new Intl.DateTimeFormat("id-ID", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                }).format(new Date(user.lastBill.dueDate))}
              </Typography>
              <Button
                variant="outlined"
                size="small"
                sx={{ mt: 1, borderRadius: 2 }}
              >
                Upgrade Paket
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
