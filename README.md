# Inventory Management System
Inventory Management System dibuat untuk mempermudah pemilik industri untuk mengelola stok barang. Proyek ini dibuat untuk tugas proyek mata kuliah SDA oleh team 5. Untuk sekarang, proyek ini masih berproses.

Template website dari: 

## Cara Menjalankan

#### Clone Kode
- Buat folder baru di document, terserah namanya apa, boleh juga dibuat didirektori selain document. 
- Klik kanan, lalu klik dua kali git bash atau kalau ada terminal, terus copy kode ini ke terminal `git clone`, tunggu sebentar itu lagi mendownload seluruh kode dari github,
- Setelah selesai, buka folder yang sudah didownload dari github melalui VS Code.

#### Menyiapkan Proyek Firebase
- Buka firebase console: https://console.firebase.google.com/
- Pilih add project
- Beri Nama proyek, misalnya inventory management system, lalu klik tombol continue
- Proyek ini tidak akan menggunakan google analytics, jadi hapus klik checkbox enable, lalu klik tombol Create Project, tunggu sebentar, lalu klik tombol Continue
- Klik tombol yang ada gambar </> di sebelah tombol dengan ikon Android,
- Beri nama app, misalnya aplikasi ims, lalu klik tombol Register App,
- Salin kode yang ada di dalam firebaseConfig(), contoh kode yang ada di dalam firebaseConfig():
    ```
    apiKey: "A040404040TsP4441b8yioqV0-6YpA",
    authDomain: "proyek.firebaseapp.com",
    projectId: "proyek",
    storageBucket: "ptoyek.appspot.com"
    messagingSenderId: "233333",
    appId: "1:233333:web:A040404040TsP4441b8yioqV0"
    ```
- Pergi ke file next.config.js, paste kode tersebut didalam env{}. contohnya:
    ```
    env{
      apiKey: "A040404040TsP4441b8yioqV0-6YpA",
    authDomain: "proyek.firebaseapp.com",
    projectId: "proyek",
    storageBucket: "ptoyek.appspot.com"
    messagingSenderId: "233333",
    appId: "1:233333:web:A040404040TsP4441b8yioqV0”
    }
    ```
- Kembali ke browser, klik tombol Continue to console
- Klik card Authentication,
- Klik tombol Get started,
- Pilih Email/Password di Native Providers
- Lalu centang Enable untuk Email/Password, dan klik tombol Save

#### Jalankan webnya
Di VSCode, buka terminal, lalu copy kode berikut: 
`npm install --legacy-peer-deps` lalu klik enter, tunggu sampai prosesnya selesai
Lalu, setelah selesai, copy kode berikut: `npm install firebase` ke terminal lalu klik enter, dan tunggu sampai selesai
Setelah selesai, copy kode berikut:  `npm run dev` ke terminal lalu klik enter
Akses websitenya di: http://localhost:3000/
Untuk buat akun baru di website pergi ke http://localhost:3000/register 
Note: kalau ada error ‘authId’, restart server (diperlukan restart server untuk memberikan efek perubahan setelah file next.config.js diedit)