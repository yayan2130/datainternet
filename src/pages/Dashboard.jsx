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

export default function Dashboard() {
  const theme = useTheme();

  const usageData = [
    { name: "Used", value: 73.4 },
    { name: "Remaining", value: 26.6 },
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
                  height: 180,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ResponsiveContainer width="60%" height="100%">
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
                    73%
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
                73.4 GB / 100 GB (Reset: 1 Des 2025)
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
                  color="success"
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
                    color="success.main"
                  >
                    Koneksi Aktif
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
                    Rp150.000
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Jatuh Tempo: 25 Nov 2025
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
                Premium Plus
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Kecepatan: 20 Mbps / 10 Mbps
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Perpanjangan berikutnya: 25 Nov 2025
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
