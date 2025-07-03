// src/app/(pages)/berita/page.tsx
'use client';

import React from 'react';
import BeritaHero from '@/components/berita/BeritaHero';
import BeritaCardsList from '@/components/berita/BeritaCardLists';
import EMagazineFlipPDF from '@/components/berita/EMagazine';
import Image from 'next/image';
import MoriAsset from '@/assets/berita/mori-berita.svg';

const BeritaPage = () => {
  return (
    // 1. Tambahkan 'overflow-x-hidden' untuk mencegah scrollbar horizontal
    //    jika kita menggeser aset sedikit keluar layar.
    <div className="relative overflow-hidden ">
      
      {/* Komponen-komponen Anda yang sudah ada */}
      <BeritaHero />
      <BeritaCardsList />
      <EMagazineFlipPDF />

      {/* 2. Floating Asset Mori (Diletakkan di akhir untuk kemudahan dibaca) */}
      {/* Penjelasan className:
        - absolute: Membuat elemen "melayang".
        - top-[450px]: Jarak dari atas. INI ADALAH NILAI UTAMA YANG PERLU ANDA UBAH untuk mengatur posisi vertikalnya.
        - right-[-40px]: Jarak dari kanan. Nilai negatif akan membuatnya sedikit keluar dari layar, seperti sedang mengintip.
        - w-[400px] h-[400px]: Ukuran aset. Gunakan nilai tetap (px/rem) agar tidak gepeng.
        - z-30: Layer. Pastikan nilainya lebih tinggi dari elemen lain agar tampil di atas.
        - pointer-events-none: SANGAT PENTING. Membuat mouse bisa "menembus" gambar ini, sehingga tidak menghalangi klik pada scrollbar atau elemen di belakangnya.
        - hidden md:block: Membuat aset disembunyikan di layar kecil (HP) dan baru muncul di layar medium (tablet/desktop) ke atas.
      */}
      <div className="hidden md:block absolute top-[660px] right-[-40px] w-[800px] h-[800px] z-30 pointer-events-none">
        <Image 
          src={MoriAsset}
          alt="Maskot Mori mengintip di halaman berita"
          fill
          className="object-contain"
        />
      </div>

    </div>
  );
};

export default BeritaPage;
