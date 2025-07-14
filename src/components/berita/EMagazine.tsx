'use client';

import HTMLFlipBook from "react-pageflip";
import React from "react";
import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from "next/image";
import EMagazineBg from "@/assets/berita/background/emagazine.svg";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Import decorative images - using correct public path
import MoriGroup from "@/assets/berita/images/mori-group.svg";
import OrnamentBlue from "@/assets/berita/images/oranament-blue.svg";
import OrnamentOrange from "@/assets/berita/images/oranament-orange.svg";
import Ornament1Group from "@/assets/berita/images/oranament1-group.svg";
import OrnamentCircle from "@/assets/berita/images/ornament-circle.svg";
import OrnamentK from "@/assets/berita/images/ornament-k.svg";
import OrnamentRingOrange from "@/assets/berita/images/ornament-ring-orange.svg";
import TakeALook from "@/assets/berita/images/takealook.svg";



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
    <div className="demoPage" ref={ref} style={{ width: '100%', height: '100%' }}>
      <div className="h-full w-full">
        {props.children}
      </div>
    </div>
  );
});

Pages.displayName = "Page";

function EMagazine({}: EMagazineProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [pdfLoaded, setPdfLoaded] = useState<boolean>(false);
  const [selectedPdf, setSelectedPdf] = useState<string>("/e-mag/tesfile.pdf");
  const [selectedVolume, setSelectedVolume] = useState<string>("Test Volume");

  // Refs untuk animasi GSAP
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const moriGroupRef = useRef<HTMLDivElement>(null);
  const ornament1Ref = useRef<HTMLDivElement>(null);
  const ornamentOrangeRef = useRef<HTMLDivElement>(null);
  const ornamentKRef = useRef<HTMLDivElement>(null);
  const takeALookRef = useRef<HTMLDivElement>(null);
  const blueOrnamentRef = useRef<HTMLDivElement>(null);
  const circleOrnamentRef = useRef<HTMLDivElement>(null);
  const ringOrnamentRef = useRef<HTMLDivElement>(null);
  const flipbookRef = useRef<HTMLDivElement>(null);

  // List of available PDF files (using smaller test file for now)
  // TODO: Host large PDF files externally (Google Drive, AWS S3, etc.)
  const pdfFiles = [
    { name: "Test Volume", path: "/e-mag/tesfile.pdf" },
    // { name: "Vol. 1", path: "https://your-external-storage.com/EMAGZVOL2.pdf" },
    // { name: "Vol. 2", path: "https://your-external-storage.com/SATCITA.pdf" },
    // Add more PDF files as needed
  ];

  useEffect(() => {
    setIsClient(true);
    
    // Setup pdfjs worker di client side
    if (typeof window !== 'undefined') {
      import('react-pdf').then(mod => {
        const { pdfjs } = mod;
        pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
        
        // Optimize memory usage
        pdfjs.getDocument.prototype.promise = pdfjs.getDocument.prototype.promise || Promise.resolve();
      });
    }
  }, []);

  // Reset loading state when PDF changes
  useEffect(() => {
    setIsLoading(true);
    setPdfLoaded(false);
    setNumPages(0);
  }, [selectedPdf]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    console.log('PDF loaded successfully with', numPages, 'pages');
    // Batasi jumlah halaman untuk menghindari memory issues
    const maxPages = Math.min(numPages, 20); // Maksimal 20 halaman
    setNumPages(maxPages);
    setIsLoading(false);
    setPdfLoaded(true);
  }

  function onDocumentLoadError(error: Error) {
    console.error('Error loading PDF:', error);
    setIsLoading(false);
    setPdfLoaded(false);
  }

  function handlePdfChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedFile = pdfFiles.find(file => file.name === e.target.value);
    if (selectedFile) {
      setSelectedPdf(selectedFile.path);
      setSelectedVolume(selectedFile.name);
    }
  }

  // Animasi GSAP yang berurutan sesuai posisi ornament dengan ScrollTrigger
  useEffect(() => {
    if (!pdfLoaded || isLoading) return;

    const ctx = gsap.context(() => {
      // Set initial states - semua element invisible dulu
      const elements = [
        headerRef.current,
        backgroundRef.current,
        moriGroupRef.current,
        ornament1Ref.current,
        ornamentKRef.current,
        ornamentOrangeRef.current,
        takeALookRef.current,
        ringOrnamentRef.current,
        blueOrnamentRef.current,
        circleOrnamentRef.current,
        flipbookRef.current
      ];

      elements.forEach(el => {
        if (el) {
          gsap.set(el, {
            opacity: 0,
            scale: 0.5,
            y: 50
          });
        }
      });

      // Create timeline yang berurutan dengan ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "bottom 85%",
          toggleActions: "play none none reverse",
          scrub: 1.5 // Smooth scrolling animation
        }
      });

      // Animasi berurutan satu per satu
      tl
      // 1. Header dulu
      .to(headerRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
      })

      // 2. Background
      .to(backgroundRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.3")

      // 3. Mori Group (Top Right)
      .to(moriGroupRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)"
      }, "-=0.2")

      // 4. E-Magazine (Flipbook) - setelah Mori Group
      .to(flipbookRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(2)"
      }, "-=0.2")

      // 5. Ornament1 Group (Right side, top) - Sejajar dengan Ring Ornament (Left side, top)
      .to([ornament1Ref.current, ringOrnamentRef.current], {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.4)"
      }, "-=0.2")

      // 6. Ornament K dan Orange Ornament (Right side, middle) - Sejajar dengan Blue Ornament (Left side, middle)
      .to([ornamentKRef.current, ornamentOrangeRef.current, blueOrnamentRef.current], {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out"
      }, "-=0.3")

      // 7. Take A Look (Bottom Right) - Sejajar dengan Circle Ornament (Left side, bottom)
      .to([takeALookRef.current, circleOrnamentRef.current], {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: "bounce.out"
      }, "-=0.1");

    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [pdfLoaded, isLoading]);

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
              file={selectedPdf} 
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
            Please check if the PDF file exists at: {selectedPdf}
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
    <div ref={containerRef} className="relative w-full mx-auto mb-20 py-16">
      {/* Header Section - Di atas background */}
      <div ref={headerRef} className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-[#0033A1] mb-8">
          E-Magazine
        </h1>
        
        {/* PDF Selector Dropdown */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <select
              value={selectedVolume}
              onChange={handlePdfChange}
              className="appearance-none border-2 border-[#0033A1] rounded-xl px-6 py-3 text-lg text-[#0033A1] font-semibold cursor-pointer outline-none focus:ring-2 focus:ring-blue-300 transition-all bg-white min-w-[20vw] shadow-lg"
            >
              {pdfFiles.map((file) => (
                <option key={file.name} value={file.name}>
                  {file.name}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path stroke="#0033A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* E-Magazine Container dengan Background */}
      <div className="relative mt-[7vw] py-16">
        {/* Background Image */}
        <div ref={backgroundRef} className="absolute flex justify-center items-center inset-0 z-0">
          <Image
            src={EMagazineBg}
            alt="E-Magazine Background"
            width={1720}
            height={100}
            className=""
            priority
          />
        </div>

        {/* Top Right - Mori Group */}
        <div ref={moriGroupRef} className="absolute -top-[30vw] -right-[10vw] z-20 hidden md:block">
          <Image
            src={MoriGroup}
            alt="Mori Group"
            width={1120}
            height={120}
            className="object-contain"
          />
        </div>

        {/* Right Side - Ornament1 Group (below Mori) - Hidden on mobile */}
        <div ref={ornament1Ref} className="absolute top-[2vw] right-[8vw] z-20 hidden md:block">
          <Image
            src={Ornament1Group}
            alt="Ornament Group"
            width={320}
            height={220}
            className="object-contain"
          />
        </div>

        {/* Right Side - Orange Ornament (below Ornament1 Group) - Hidden on mobile */}
        <div ref={ornamentOrangeRef} className="absolute top-[20vw] right-[15vw] z-30 hidden md:block">
          <Image
            src={OrnamentOrange}
            alt="Orange Ornament"
            width={150}
            height={120}
            className="object-contain"
          />
        </div>

        {/* Right Side - Ornament K (below Orange) - Hidden on mobile */}
        <div ref={ornamentKRef} className="absolute top-[17vw] right-[2vw] z-20 hidden md:block">
          <Image
            src={OrnamentK}
            alt="Ornament K"
            width={270}
            height={120}
            className="object-contain"
          />
        </div>

        {/* Right Side - Take A Look */}
        <div ref={takeALookRef} className="absolute -bottom-[2vw] right-[7vw] z-30 hidden md:block">
          <Image
            src={TakeALook}
            alt="Take A Look"
            width={450}
            height={350}
            className="object-contain"
          />
        </div>

        {/* Left Side - Blue Ornament - Hidden on mobile */}
        <div ref={blueOrnamentRef} className="absolute top-[20vw] left-[10vw] z-20 hidden md:block">
          <Image
            src={OrnamentBlue}
            alt="Blue Ornament"
            width={220}
            height={120}
            className="object-contain"
          />
        </div>

      

        {/* Left Side - Ornament Circle - Hidden on mobile */}
        <div ref={circleOrnamentRef} className="absolute bottom-0 left-0 z-20 hidden md:block">
          <Image
            src={OrnamentCircle}
            alt="Ornament Circle"
            width={70}
            height={70}
            className="object-contain"
          />
        </div>

        {/* Bottom Center - Orange Ring - Hidden on mobile */}
        <div ref={ringOrnamentRef} className="absolute top-[10vw] left-0 z-20 hidden md:block">
          <Image
            src={OrnamentRingOrange}
            alt="Orange Ring Ornament"
            width={180}
            height={100}
            className="object-contain"
          />
        </div>

        {/* Magazine Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto pt-16">
          <div className="relative flex justify-center items-center min-h-[400px] md:min-h-[600px]">
            <div ref={flipbookRef} className="relative w-full h-[400px] md:h-[600px] flex justify-center items-center">
              <HTMLFlipBook
                width={400}
                height={750}
                size="fixed"
                minWidth={280}
                maxWidth={450}
                minHeight={350}
                maxHeight={750}
                showCover={true}
                flippingTime={800}
                usePortrait={false}
                startZIndex={0}
                maxShadowOpacity={0}
                showPageCorners={true}
                disableFlipByClick={false}
                className="flipbook-container"
                style={{}}
                startPage={0}
                drawShadow={false}
                clickEventForward={true}
                useMouseEvents={true}
                swipeDistance={30}
                mobileScrollSupport={true}
                autoSize={true}
              >
                {/* Render setiap halaman PDF sebagai page terpisah */}
                {[...Array(numPages).keys()].map((pg) => (
                  <Pages key={pg} number={pg + 1}>
                    <Document
                      file={selectedPdf}
                      loading={<div className="flex items-center justify-center h-full">Memuat...</div>}
                      error={<div className="text-red-500 text-center">Gagal memuat halaman</div>}
                    >
                      <Page
                        pageNumber={pg + 1}
                        width={350}
                        height={500}
                        scale={1.15}
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
      </div>
    </div>
  );
}

export default EMagazine;

