// File: components/TentangComponents/Folder.tsx (FINAL & LENGKAP)

import Image from 'next/image';
import React from 'react';
import type { StaticImageData } from 'next/image';

// Helper function untuk mengubah Hex ke RGBA
// Ini akan kita gunakan untuk membuat shadow dengan transparansi
const hexToRgba = (hex: string, alpha: number = 1): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

interface FolderProps {
    nama: string;
    imageUrl: string | StaticImageData;
    isHovered: boolean;
    isDimmed: boolean;
    isActive: boolean; // Memastikan prop 'isActive' ada
    shadowColor: string; // Menerima warna dasar (HEX)
}

const Folder: React.FC<FolderProps> = ({ nama, imageUrl, isHovered, isDimmed, isActive, shadowColor }) => {
    
    // Buat warna shadow dengan transparansi 0.4 dari warna HEX yang diterima
    const finalShadowColor = hexToRgba(shadowColor, 0.4);

    // Logika transform yang lengkap (memperhitungkan hover, aktif, dan redup)
    let transform = 'scale(1) translateY(0)';
    let opacity = '1';
    if (isHovered) {
        // Efek hover menjadi prioritas utama dan lebih menonjol
        transform = 'scale(1.15) translateY(-1.5vw)';
    } else if (isActive) {
        // Jika tidak di-hover TAPI aktif, buat sedikit lebih besar
        transform = 'scale(1.05)';
        opacity = '1';
    } else if (isDimmed) {
        // Jika tidak aktif dan ada folder lain yang di-hover
        transform = 'scale(0.9)';
        opacity = '0.8';
    }

    const containerStyle: React.CSSProperties = {
        position: 'relative',
        width: '16vw',
    // Menggunakan ukuran yang Anda tentukan
        aspectRatio: '10/9',
        transform: transform,
        opacity: isDimmed ? '0.6' : '1',
        // Tampilkan shadow jika di-hover ATAU jika sedang aktif
        filter: isHovered || isActive ? `drop-shadow(0 12px 20px ${shadowColor})` : 'none',
        transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out, filter 0.3s ease-in-out',
        cursor: 'pointer',
    };

    return (
        <div style={containerStyle}>
            <Image
                src={imageUrl}
                alt={nama}
                layout="fill"
                objectFit="contain"
            />
            {/* Menerapkan gaya teks yang Anda inginkan */}
            <div 
                style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%', // Menggunakan width 80%
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'start', // Rata kiri horizontal
                    alignItems: 'end', // Rata bawah vertikal
                    textAlign: 'start', // Teks mulai dari kiri
                    color: 'white',
                    fontWeight: 600,
                    fontSize: 'clamp(1.5vw, 1.5vw, 1rem)', // Menggunakan font-size yang Anda tentukan
                    padding: '1.5vw',
                    lineHeight: '1.2',
                }}
            >
                {nama}
            </div>
        </div>
    );
};

export default Folder;