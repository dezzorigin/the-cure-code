# arsitektur — the-cure-code

## gambaran

satu halaman statis, tiga file, tanpa build step:

```
index.html   — struktur landing + editor
style.css    — seluruh gaya (landing + editor), tanpa framework
script.js    — mesin ketik: tokenizer, renderer, state machine
```

deploy: cloudflare pages (direct upload, aset statis). CI: github actions
(`html-validate`, `markdown-link-check`, `node --check`).

## mesin ketik (script.js)

### data

`LINES` — array 15 string, isi lirik pseudo-code. satu-satunya sumber
kebenaran untuk animasi dan daftar lirik di halaman (daftar statis di
`<pre class="lines">` ditulis agar identik dengan array ini; CI memeriksa
jumlah baris array = 15).

### tokenizer

`TOKEN_RE` — satu regex dengan 7 grup tangkap, dievaluasi berurutan:

1. komentar `//…` → `.com` (hijau)
2. string `"…"` → `.str` (krem)
3. keyword `why|because|got|and|but|oh` → `.kw` (pink)
4. properti `stitch|be|is_full_of|its_not|in|to|like|for_me|how` → `.prop` (biru)
5. `{ } : ;` → `.br` (kuning)
6. `( )` → `.par` (merah)
7. sisanya → `.pl` (abu terang)

`highlight(text)` meng-escape html dulu, lalu membungkus tiap token dengan
`<span class="…">`. regex bersifat global + stateful (`lastIndex`), jadi
direset di awal tiap pemanggilan.

### state machine

```
start() → render baris kosong + kursor
  → tick(): ketik 1 karakter (55 ms ± 30 ms acak, dibagi speed)
  → akhir baris: jeda 380 ms, lanjut baris berikut
  → baris habis: status "done — restarting…", jeda 3200 ms
  → start() lagi (loop)
```

state: `lineIdx`, `charIdx`, `timer`, `paused`, `speed`.
`render()` menulis ulang `innerHTML` `#code` dari baris yang sudah selesai
+ potongan baris berjalan + kursor, memperbarui gutter, dan auto-scroll
`#codeWrap` ke bawah (dan horizontal mengikuti kursor).

### kontrol

- **jeda/lanjut** (`#pauseBtn`): `setPaused(true)` membersihkan timer dan
  membekukan state; lanjut menjadwalkan `tick()` lagi dari posisi yang
  sama — tidak ada karakter yang hilang atau terulang.
- **kecepatan** (`#speedSel`): `scaled(ms) = ms / speed`; berlaku untuk
  ritme ketik, jeda baris, jeda akhir, dan jeda awal.
- **replay** (`#replay` + klik editor): `start()` — reset `lineIdx` /
  `charIdx`, bersihkan timer lama. klik pada tombol/select tidak ikut
  me-restart (dicek via `closest("button, select, a")`).

## gaya (style.css)

- satu font stack monospace di seluruh halaman; aksen pink `#ff2d55`
  (kursor, dot, tombol utama) di atas hitam `#000` / panel `#0d0d0d`.
- navbar sticky dengan backdrop blur; hero fluid type via `clamp()`.
- editor adalah kartu ber-border dengan bayangan pink samar; tinggi area
  kode `min(58vh, 460px)` (mobile: `52vh`); scrollbar disembunyikan.
- breakpoint tunggal `640px`: nav links disembunyikan, padding hero
  mengecil.

## diagram

lihat `diagram.svg` — alur state machine mesin ketik.
