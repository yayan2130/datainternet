import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  CardContent,
} from "@mui/material";

const currency = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);

export default function Payment({ user }) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const selectedPackage = state?.selectedPackage;
  const [method, setMethod] = useState("");
  const today = new Date().toISOString().split("T")[0];

  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + (selectedPackage.duration || 30));
  const expiry = expiryDate.toISOString().split("T")[0];

  if (!selectedPackage) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>
          Tidak ada data paket yang dipilih
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")}>
          Kembali ke Dashboard
        </Button>
      </Box>
    );
  }

  const handleSubmit = async () => {
    try {
      // 🧾 1. Simpan riwayat pembelian baru ke /payments
      const newPayment = {
        userId: Number(user.id),
        packageId: Number(selectedPackage.id),
        amount: Number(selectedPackage.price),
        purchaseDate: today,
        expiryDate: expiry,
        validityDays: Number(selectedPackage.validityDays),
        invoiceId: `INV-${today.replace(/-/g, "")}-${Math.floor(
          Math.random() * 1000
        )
          .toString()
          .padStart(3, "0")}`,
      };

      const res1 = await fetch("http://localhost:3000/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPayment),
      });

      if (!res1.ok) throw new Error("Gagal menyimpan data pembayaran.");

      // 🧮 2. Tambah kuota user sesuai paket yang dibeli
      const updatedUser = {
        ...user,
        quota: {
          ...user.quota,
          total: user.quota.total + Number(selectedPackage.quota),
        },
      };

      const res2 = await fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quota: updatedUser.quota,
          packageId: Number(selectedPackage.id),
        }),
      });

      if (!res2.ok) throw new Error("Gagal memperbarui kuota user.");

      // 💾 3. Simpan user terbaru ke localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // ✅ 4. Beri notifikasi dan redirect
      alert(
        `Pembelian paket ${selectedPackage.name} sebesar ${currency(
          selectedPackage.price
        )} berhasil! Kuota Anda bertambah ${selectedPackage.quota} GB.`
      );
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat memproses pembayaran.");
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Konfirmasi Pembelian Paket
      </Typography>

      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" fontWeight={600}>
            {selectedPackage.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Kecepatan: {selectedPackage.speed}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Kuota: {selectedPackage.quota} GB
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Harga: {currency(selectedPackage.price)}
          </Typography>
        </CardContent>
      </Card>

      <Typography variant="h6" gutterBottom>
        Pilih Metode Pembayaran
      </Typography>

      <RadioGroup
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        sx={{ mb: 3 }}
      >
        <FormControlLabel value="QRIS" control={<Radio />} label="QRIS" />
        <FormControlLabel
          value="Transfer Bank"
          control={<Radio />}
          label="Transfer Bank"
        />
        <FormControlLabel
          value="Virtual Account"
          control={<Radio />}
          label="Virtual Account"
        />
      </RadioGroup>

      <Button variant="contained" disabled={!method} onClick={handleSubmit}>
        Bayar Sekarang
      </Button>
    </Box>
  );
}
