# PRD — the-cure-code

## 1. ringkasan

**the-cure-code** adalah satu halaman web statis yang memutar ulang animasi
"lirik sebagai kode": bridge + chorus lagu "the cure" (olivia rodrigo, 2026)
ditulis ulang jadi pseudo-code, lalu diketik baris demi baris di editor gelap
dengan syntax highlight dan kursor blok pink, lalu loop tanpa henti.

produk ini adalah karya kecil — bukan pemutar lagu, bukan karaoke, bukan
aplikasi lirik. nilainya ada di suasananya: editor, pewarnaan, ritme ketik.

## 2. pengguna & tujuan

- **pengguna:** siapa pun yang melihat video tiktok format "lirik sebagai
  kode" dan mau versi web-nya yang bisa diputar ulang kapan pun.
- **tujuan:** buka halaman → animasi langsung jalan → bisa jeda, ubah
  kecepatan, atau replay tanpa reload.

## 3. ruang lingkup

### masuk (v1.1.0)

- animasi ketik 15 baris lirik (bridge + chorus), verbatim dari transkrip
  video — kecuali satu perbaikan typo: baris 10 kurungnya ditutup
  (`you.tried_so_hard( to: "suck_em_out" ) };`).
- syntax highlight 7 token class (keyword, properti, string, kurung,
  paren, komentar, plain) sesuai pewarnaan video.
- gutter nomor baris yang ikut bertambah, auto-scroll mengikuti kursor.
- kontrol: jeda/lanjut, kecepatan 0.5× / 1× / 2×, replay; klik editor
  untuk mengulang dari awal.
- landing satu halaman: navbar (logo github kanan), hero, demo editor,
  cara kerja, daftar lirik statis, fitur, footer kredit.
- deploy statis di cloudflare pages; tanpa build step, tanpa dependensi.

### tidak masuk

- audio apa pun (tidak ada file audio di repo; dinyatakan jujur di halaman
  dan readme).
- lirik lagu lain, input lirik custom, atau mode karaoke.
- akun, analitik, atau request jaringan apa pun — halaman ini 100% lokal.

## 4. persyaratan fungsional

| id | persyaratan | kriteria terima |
|----|-------------|-----------------|
| f1 | animasi mulai otomatis saat halaman dimuat | karakter pertama muncul ≤ 1 detik setelah load |
| f2 | 15 baris diketik berurutan lalu loop | setelah baris 15, jeda 3,2 detik, mulai lagi dari baris 1 |
| f3 | jeda/lanjut | tombol jeda membekukan ketikan; lanjut meneruskan dari posisi yang sama |
| f4 | kecepatan | 0.5× / 1× / 2× mengubah ritme ketik dan jeda secara proporsional |
| f5 | replay | tombol replay dan klik editor mengulang animasi dari baris 1 |
| f6 | gutter | nomor baris bertambah mengikuti baris yang sedang diketik |
| f7 | responsif | layout utuh di 390 px (mobile) dan 1280 px (desktop), tanpa overflow horizontal |

## 5. persyaratan non-fungsional

- **ukuran:** total aset < 30 kb (html + css + js).
- **dependensi:** nol. font monospace sistem sebagai fallback.
- **aksesibilitas:** tombol kontrol punya label; kontras teks ≥ 4.5:1 pada
  latar hitam untuk teks utama.
- **performa:** tanpa request jaringan selain halaman itu sendiri.

## 6. batasan yang dinyatakan jujur

- video demo direkam headless, jadi **tanpa suara** — dan memang tidak ada
  suara di produk ini.
- lirik ditranskrip dari video tiktok, bukan dari lirik resmi yang
  diterbitkan; ejaan pseudo-code mengikuti video.
- satu baris lirik di video kurungnya tidak tertutup; diperbaiki di sini
  dan dicatat di changelog (bukan disembunyikan).
