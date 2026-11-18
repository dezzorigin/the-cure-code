# changelog — the-cure-code

## v1.1.0 — 2026-11-18

rebuild total jadi proper.

### ditambah

- landing ala saas: navbar sticky + logo github kanan, hero dua kolom
  (teks + editor sebagai preview produk), seksi cara kerja, daftar lirik,
  fitur, footer kredit.
- kontrol animasi: tombol jeda/lanjut dan pemilih kecepatan 0.5× / 1× / 2×.
- LICENSE MIT, `.gitignore`, CI github actions (html-validate,
  markdown-link-check, `node --check` + cek jumlah baris lirik).
- docs: PRD, arsitektur, diagram alur state machine (svg).
- deploy live di cloudflare pages + link di about repo.
- screenshot + video demo (direkam headless, tanpa suara — dinyatakan jujur).

### diperbaiki

- baris lirik ke-10 kurungnya tidak tertutup di versi lama
  (`you.tried_so_hard( to: "suck_em_out" };`) — sekarang
  `you.tried_so_hard( to: "suck_em_out" ) };`. satu-satunya perubahan isi
  lirik; 14 baris lain verbatim.

### diubah

- halaman tidak lagi fullscreen editor saja — editor sekarang kartu demo di
  tengah landing yang bisa di-scroll. tampilan editor, warna, dan ritme
  ketik dipertahankan.

## v1.0.0 — 2026-11-11 (versi awal)

- animasi ketik 15 baris lirik "the cure" sebagai kode, editor fullscreen,
  loop otomatis, tombol replay, klik untuk mengulang.
- readme singkat, deploy github pages.
