// src/pages/HistoryPembayaran.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/GridLegacy";
const currency = (value) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
    value
  );

export default function HistoryPembayaran() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      setError("");
      try {
        const rawUser = localStorage.getItem("user");
        if (!rawUser) {
          setError(
            "Anda belum login. Silakan login untuk melihat histori pembayaran."
          );
          setPayments([]);
          setLoading(false);
          return;
        }
        const user = JSON.parse(rawUser);
        const res = await fetch(
          `http://localhost:3000/payments?userId=${user.id}&_sort=dueDate&_order=desc`
        );
        if (!res.ok) throw new Error("Gagal mengambil data pembayaran");
        const data = await res.json();
        setPayments(data);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat histori pembayaran. Coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  

  const openDetail = (payment) => {
    setSelected(payment);
    setDialogOpen(true);
  };

  const closeDetail = () => {
    setDialogOpen(false);
    setSelected(null);
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
        Riwayat Pembayaran
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Lihat catatan transaksi dan status pembayaran Anda.
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : payments.length === 0 ? (
        <Card>
          <CardContent>
            <Typography>Belum ada histori pembayaran.</Typography>
            <Typography variant="body2" color="text.secondary">
              Jika Anda baru saja melakukan pembayaran, coba muat ulang halaman.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <>
          <Grid container spacing={2}>
            {payments.map((p) => {
              return (
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
                            {p.invoiceId}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 0.5 }}
                          >
                            Expiry Date:{" "}
                            {p.expiryDate
                              ? new Intl.DateTimeFormat("id-ID", {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                }).format(new Date(p.expiryDate))
                              : "-"}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 0.5 }}
                          >
                            Validity Days: {p.validityDays} Days
                          </Typography>
                        </Box>

                        <Box sx={{ textAlign: "right" }}>
                          <Typography variant="h6" fontWeight={700}>
                            {currency(p.amount)}
                          </Typography>
                        </Box>
                      </Box>

                      <Divider sx={{ my: 1 }} />

                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          justifyContent: "flex-end",
                        }}
                      >
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => openDetail(p)}
                        >
                          Lihat Detail
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </>
      )}

      {/* Detail Dialog */}
      <Dialog fullWidth maxWidth="sm" open={dialogOpen} onClose={closeDetail}>
        <DialogTitle>Detail Pembayaran</DialogTitle>
        <DialogContent dividers>
          {!selected ? (
            <Typography>Loading...</Typography>
          ) : (
            <Box sx={{ display: "grid", gap: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle2">Invoice ID</Typography>
                <Typography variant="body2">
                  {selected.invoiceId || "-"}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle2">Price</Typography>
                <Typography variant="body2">
                  {currency(selected.amount)}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle2">Tanggal Pembayaran</Typography>
                <Typography variant="body2">
                  {selected.purchaseDate
                    ? new Intl.DateTimeFormat("en-GB", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      }).format(new Date(selected.purchaseDate))
                    : "-"}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle2">Expiry Date</Typography>
                <Typography variant="body2">
                  {selected.expiryDate
                    ? new Intl.DateTimeFormat("en-GB", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      }).format(new Date(selected.expiryDate))
                    : "-"}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle2">Price</Typography>
                <Typography variant="body2">
                  {selected.validityDays} Days
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDetail}>Tutup</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
