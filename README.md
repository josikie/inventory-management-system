# Inventory Management System

Inventory Management System dibuat untuk mempermudah pemilik industri untuk mengelola stok barang. Proyek ini dibuat untuk tugas proyek mata kuliah SDA oleh team 5. Untuk sekarang, proyek ini masih berproses.

Template website dari: https://github.com/themeselection/materio-mui-react-nextjs-admin-template-free

## Cara Menjalankan

#### Clone Kode
- Buat folder baru di document, terserah namanya apa, boleh juga dibuat didirektori selain document. 
- Klik kanan, lalu klik dua kali git bash atau kalau ada terminal, terus copy kode ini ke terminal `git clone https://github.com/josikie/inventory-management-system.git`, tunggu sebentar itu lagi mendownload seluruh kode dari github,
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
- Klik card Firestore Database
- Klik tombol Get started
- Lalu pada Firestore Database pergi ke Tab Rules dan edit rules seperti dibawah ini
  ```
  rules_version = '2';

  service cloud.firestore {
    match /databases/{database}/documents {
      match /{document=**} {
        allow read, write;
      }
    }
  }
  ```

#### Jalankan webnya

- Di VSCode, buka terminal, lalu copy kode berikut:
  `npm install --legacy-peer-deps` lalu klik enter, tunggu sampai prosesnya selesai
- Lalu, setelah selesai, copy kode berikut: `npm install firebase` ke terminal lalu klik enter, dan tunggu sampai selesai
- Setelah selesai, copy kode berikut: `npm run dev` ke terminal lalu klik enter
- Akses websitenya di: http://localhost:3000/
- Pergi ke http://localhost:3000/pages/register untuk membuat akun baru, sebenarnya di http://localhost:3000/ bakalan auto redirect ke http://localhost:3000/pages/register
- Note: kalau ada error ‘authId’, restart server (diperlukan restart server untuk memberikan efek perubahan setelah file next.config.js diedit)

#### Berhasil Menjalankan

![berhasil](https://github.com/josikie/inventory-management-system/assets/54074780/bba451a6-639e-4f39-8aff-ce23ad6770f9)

### Resource (Buat Belajar)

1. Nambahkan CSS ke element: https://mui.com/material-ui/react-box/#the-sx-prop
2. Nambahkan Element: https://mui.com/material-ui/
3. Belajar Next JS langsung dari dokumentasi: https://nextjs.org/docs
4. Belajar dasar dasar Next JS (video, bahasa Indo): https://www.youtube.com/watch?v=jbqzDR0JfNw
5. Belajar dasar dasar Next JS (video, bahasa inggris): https://www.youtube.com/watch?v=tsmaQdgidKg
6. Belajar Autentikasi Next JS: https://www.freecodecamp.org/news/create-full-stack-app-with-nextjs13-and-firebase/
