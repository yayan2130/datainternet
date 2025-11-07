import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import { useNavigate } from "react-router-dom";

const currency = (value) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
    value
  );

export default function BeliPaket() {
  const [paketList, setPaketList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPackage, setselectedPackage] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
    const navigate = useNavigate();


    const handlePay = (selectedPackage) => {
    navigate("/payment", { state: { selectedPackage } });
  };

  useEffect(() => {
    const fetchPaket = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("http://localhost:3000/quotas");
        if (!res.ok) throw new Error("Gagal mengambil data paket.");
        const data = await res.json();
        setPaketList(data);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat daftar paket. Coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchPaket();
  }, []);

  const openDetail = (paket) => {
    setselectedPackage(paket);
    setDialogOpen(true);
  };

  const closeDetail = () => {
    setDialogOpen(false);
    setselectedPackage(null);
  };

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        p: { xs: 2, md: 3 },
      }}
    >
      <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
        Daftar Paket Internet
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Pilih paket internet yang tersedia di bawah ini.
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : paketList.length === 0 ? (
        <Card>
          <CardContent>
            <Typography>Tidak ada paket tersedia.</Typography>
            <Typography variant="body2" color="text.secondary">
              Silakan coba lagi nanti.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={2}>
          {paketList.map((p) => (
            <Grid item key={p.id} xs={12} md={6}>
              <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 1,
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {p.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Kuota: {p.quota} GB
                      </Typography>
                    </Box>

                    <Box sx={{ textAlign: "right" }}>
                      <Typography variant="h6" fontWeight={700}>
                        {currency(p.price)}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 1 }} />

                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      size="small"
                      variant="contained"
                      sx={{ ml: 1 }}
                      color="primary"
                      onClick={() => openDetail(p)}
                    >
                      Beli Sekarang
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Detail Paket Dialog */}
      <Dialog fullWidth maxWidth="sm" open={dialogOpen} onClose={closeDetail}>
        <DialogTitle>Detail Paket</DialogTitle>
        <DialogContent dividers>
          {!selectedPackage ? (
            <Typography>Loading...</Typography>
          ) : (
            <Box sx={{ display: "grid", gap: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle2">Nama Paket</Typography>
                <Typography variant="body2">{selectedPackage.name}</Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle2">Kuota</Typography>
                <Typography variant="body2">{selectedPackage.amount} GB</Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle2">Harga</Typography>
                <Typography variant="body2">
                  {currency(selectedPackage.price)}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDetail}>Tutup</Button>
          {selectedPackage && (
            <Button
              variant="contained"
              sx={{ ml: 1 }}
              onClick={() => handlePay(selectedPackage)}
            >
              Bayar
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
