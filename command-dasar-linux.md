Kalau baru pindah dari Windows/GUI ke Linux, terminal itu terasa asing di awal. Tapi begitu terbiasa, kerja jadi jauh lebih cepat dibanding klak-klik mouse. Berikut command dasar yang bakal sering dipake tiap hari.

## Navigasi File & Direktori

Command paling dasar buat pindah-pindah folder dan lihat isi direktori.

```bash
pwd                 # tampilkan path direktori sekarang
ls                  # list isi direktori
ls -la              # list lengkap + file tersembunyi
cd nama-folder      # pindah ke folder
cd ..               # naik satu level
cd ~                # balik ke home directory
```

## Mengelola File & Folder

```bash
touch file.txt          # bikin file kosong
mkdir folder-baru       # bikin folder
mkdir -p a/b/c           # bikin folder nested sekaligus
cp file.txt salinan.txt  # copy file
cp -r folder1 folder2    # copy folder beserta isinya
mv file.txt folder/      # pindah/rename file
rm file.txt              # hapus file
rm -rf folder/           # hapus folder + isinya (hati-hati!)
```

> `rm -rf` itu permanen, gak ada recycle bin. Pastiin path-nya bener sebelum enter.

## Melihat Isi File

```bash
cat file.txt          # tampilkan seluruh isi file
less file.txt          # baca file per halaman (q buat keluar)
head -n 20 file.txt    # 20 baris pertama
tail -n 20 file.txt    # 20 baris terakhir
tail -f log.txt        # ikutin file yang terus bertambah (log realtime)
```

## Permission & Ownership

Linux ketat soal siapa boleh baca/tulis/eksekusi apa.

```bash
chmod +x script.sh        # kasih izin eksekusi
chmod 755 file.txt         # ubah permission (owner rwx, lainnya rx)
chown user:group file.txt  # ubah pemilik file
sudo command                # jalankan sebagai root/admin
```

Format permission `755` itu tiga digit: owner, group, others. Tiap digit jumlah dari read(4) + write(2) + execute(1).

## Mencari File & Teks

```bash
find . -name "*.js"           # cari file .js di direktori sekarang
grep "error" log.txt           # cari kata "error" di file
grep -r "TODO" src/            # cari rekursif di seluruh folder
grep -i "warning" log.txt      # cari tanpa peduli huruf besar/kecil
```

## Process Management

```bash
ps aux              # list semua process yang jalan
top                  # monitor process realtime (interaktif)
kill 1234            # hentikan process dengan PID 1234
kill -9 1234          # paksa hentikan (force kill)
htop                  # versi top yang lebih enak dilihat (perlu install)
```

## Package Management

Tergantung distro yang dipakai:

```bash
# Debian/Ubuntu
sudo apt update
sudo apt install nama-package

# Arch Linux
sudo pacman -S nama-package

# Fedora
sudo dnf install nama-package
```

## Jaringan

```bash
ping google.com              # tes koneksi ke host
curl https://api.com          # request HTTP dari terminal
wget https://file.com/x.zip   # download file
ifconfig                       # lihat info network interface (atau `ip a`)
```

## Kompresi & Ekstraksi

```bash
tar -czvf archive.tar.gz folder/   # compress folder jadi tar.gz
tar -xzvf archive.tar.gz            # extract tar.gz
zip -r archive.zip folder/           # compress jadi zip
unzip archive.zip                     # extract zip
```

## Tips Tambahan

- `Ctrl + C` — hentikan command yang lagi jalan
- `Ctrl + R` — cari command yang pernah diketik sebelumnya
- `history` — lihat riwayat command
- `man command` — buka manual/dokumentasi command tertentu
- `!!` — ulangi command terakhir (berguna buat nambah `sudo` di depan command yang gagal karena permission)

## Penutup

Command di atas udah cukup buat kerja sehari-hari di terminal Linux. Gak perlu hafal semua sekaligus — cukup biasakan pakai yang relevan sama kerjaan, lama-lama otomatis nempel di tangan.
