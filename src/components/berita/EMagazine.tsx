'use client';

import HTMLFlipBook from "react-pageflip";
import React from "react";
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from "next/image";


// Disable SSR untuk komponen PDF
const Document = dynamic(
  () => import('react-pdf').then(mod => mod.Document),
  { ssr: false }
);

const Page = dynamic(
  () => import('react-pdf').then(mod => mod.Page),
  { ssr: false }
);

// Type definitions
interface PageProps {
  children: React.ReactNode;
  number: number;
}

interface EMagazineProps {
  pdfUrl?: string;
}

// Pages component dengan proper TypeScript typing
const Pages = React.forwardRef<HTMLDivElement, PageProps>((props, ref) => {
  return (
    <div className="demoPage flex justify-center  p-4 " ref={ref} style={{ width: '100%', height: '100%' }}>
      <div className="h-full flex flex-col">
        <div className="flex-1">
          {props.children}
        </div>
        <div className="text-center text-sm text-gray-500 mt-2">
          Page {props.number}
        </div>
      </div>
    </div>
  );
});

Pages.displayName = "Page";

function EMagazine({ pdfUrl = "/e-mag/tesfile.pdf" }: EMagazineProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [pdfLoaded, setPdfLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
    
    // Setup pdfjs worker di client side
    if (typeof window !== 'undefined') {
      import('react-pdf').then(mod => {
        const { pdfjs } = mod;
        pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
      });
    }
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    console.log('PDF loaded successfully with', numPages, 'pages');
    setNumPages(numPages);
    setIsLoading(false);
    setPdfLoaded(true);
  }

  function onDocumentLoadError(error: Error) {
    console.error('Error loading PDF:', error);
    setIsLoading(false);
    setPdfLoaded(false);
  }

  // Render hanya di client side
  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2">Initializing...</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading PDF Magazine...</p>
          {/* Hidden Document untuk load PDF info */}
          <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
            <Document 
              file={pdfUrl} 
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
            />
          </div>
        </div>
      </div>
    );
  }

  if (!pdfLoaded || numPages === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center text-red-500">
          <p>Failed to load PDF</p>
          <p className="text-sm text-gray-500 mt-2">
            Please check if the PDF file exists at: {pdfUrl}
          </p>
          <button 
            onClick={() => {
              setIsLoading(true);
              setPdfLoaded(false);
              setNumPages(0);
            }}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    // 1. Wrapper Utama: Dibuat relatif dan diberi aspect ratio agar tidak gepeng.
    // Anda bisa sesuaikan aspect-ratio sesuai gambar background Anda. Misal: aspect-[4/3] atau aspect-video.
    <div className="relative w-full  mx-auto aspect-[4/3]">
      
      {/* 2. Background Image: Mengisi wrapper, di belakang (z-0), dan tidak distorsi (object-contain) */}
      <Image
        src="/Assets/background/emagazine.svg" // Pastikan path ini benar
        alt="EMagazine Background"
        fill
        className="absolute inset-0  z-0 object-contain"
      />

      {/* 3. Kontainer Buku: Menumpuk di atas (z-10) dan menggunakan flex untuk memusatkan isinya */}
      <div className="absolute inset-0 z-10 flex justify-center items-center">
        
        {/* 4. Pengatur Ukuran Buku: Div ini yang menentukan ukuran buku secara responsif.
            - Sesuaikan persentase w-[80%] dan h-[85%] agar pas dengan area di dalam background Anda.
            - Coba ganti-ganti nilainya sampai Anda menemukan yang paling pas.
        */}
        <div className="relative w-[50%] flex justify-center h-[100%]">
          <HTMLFlipBook
            // Properti width & height di sini menjadi rasio awal,
            // `size="stretch"` akan membuatnya mengisi div di atas.
            width={500}
            height={700}
            size="stretch" // SANGAT PENTING: membuat buku mengisi parent-nya
            // Properti lain yang sudah Anda set
            minWidth={200}
            maxWidth={1000}
            minHeight={280}
            maxHeight={1400}
            showCover={true}
            flippingTime={1000}
            usePortrait={true}
            startZIndex={0}
            maxShadowOpacity={0.5}
            showPageCorners={true}
            disableFlipByClick={false}
             // Tambahkan shadow untuk efek 3D
          >
            {[...Array(numPages).keys()].map((pg) => (
              <Pages key={pg} number={pg + 1}>
                <Document
                  file={pdfUrl}
                  loading={<div className="flex items-center justify-center h-full">Memuat...</div>}
                  error={<div className="text-red-500 text-center">Gagal memuat halaman</div>}
                >
                  <Page
                    pageNumber={pg + 1}
                    // Lebar page dibuat agar mengisi penuh kontainer Pages
                    width={null} 
                    height={null}
                    loading={<div className="flex items-center justify-center h-full">Memuat halaman {pg + 1}...</div>}
                    error={<div className="text-red-500 text-center">Gagal memuat halaman {pg + 1}</div>}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </Document>
              </Pages>
            ))}
          </HTMLFlipBook>
        </div>
      </div>
    </div>
  );
}

export default EMagazine;

