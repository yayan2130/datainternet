# Data Internet

Persiapan lingkungan

Sebelum menjalankan, pastikan Anda memiliki:
- Node.js & npm (atau pnpm) terinstal di sistem Anda.
- Git untuk clone repo.

Cara menjalankan project ini

Berikut langkah-menjalankan untuk frontend di repo ini:

1. Clone repository: \
`git clone https://github.com/yayan2130/datainternet.git` \
`cd datainternet`

2. Install dependencies: \
Karena ada file `pnpm-lock.yaml`, bisa menggunakan pnpm: \
`pnpm install` \
install json-server: \
`npm install -g json-server`

3. Jalankan server frontend:
`pnpm run dev`
atau jika npm:
`npm run dev`

4. Jalankan json-server
`json-server --watch db.json`

Ini akan menjalankan Vite dev server dan Anda bisa buka di browser (biasanya `http://localhost:5173` atau sebagainya).
backend akan berjalan di `http://localhost:3000`
========================================================================================================================================================================
