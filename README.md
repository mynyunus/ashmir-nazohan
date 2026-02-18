# Landing Page Ashmir Nazohan (Great Eastern Takaful)

Landing page statik (tanpa backend) untuk conversion ke WhatsApp.

## Struktur Fail

- `index.html` - Struktur halaman + kandungan section + SEO meta
- `styles.css` - Styling UI/UX (corporate premium, responsif, aksesibiliti)
- `script.js` - Interaksi minimum (navbar, menu mobile, reveal, back-to-top)
- `assets/` - Letak imej testimoni dan OG image

## Jalankan Secara Lokal

```bash
python3 -m http.server 8080
```

Kemudian buka `http://localhost:8080`.

## Deploy ke Cloudflare Pages

1. Push projek ini ke GitHub.
2. Di Cloudflare Pages, pilih **Create a project** dan sambungkan repo.
3. Konfigurasi build:
   - Framework preset: `None`
   - Build command: `none` (atau biar kosong)
   - Build output directory: `/`
4. Deploy.

## Nota

- Tiada build step.
- Tiada backend.
- Kemas kini imej testimoni pada:
  - `/assets/testi-1.jpg`
  - `/assets/testi-2.jpg`
  - `/assets/testi-3.jpg`
- Disyorkan sediakan OG image di `/assets/og-cover.jpg`.
