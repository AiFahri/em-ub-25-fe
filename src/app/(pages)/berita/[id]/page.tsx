'use client';

import React from "react";
import { useQuery } from "@apollo/client";
import { GET_NEWS, LIST_NEWS } from "@/graphql/queries/berita/beritaQueries"; // Sesuaikan path import ini
import Image from "next/image";
import BeritaHero from '@/components/berita/BeritaHero';
import BeritaCardSide from "@/components/berita/BeritaCardSide";
import subpageBg from '@/assets/berita/background/subpageBg.svg';
import clsx from "clsx";
import Link from 'next/link';

type NewsItem = {
    id: string | number;
    title: string;
    content: string;
    publishedAt: string;
    categoryName?: string;
    imageUrls?: string[];
    ministryName?: string; // Tambahkan jika ada
};

type GetNewsData = {
    getNews: NewsItem;
}

type ListNewsData = {
    listNews: {
        news: NewsItem[];
    };
};


export default function BeritaDetailPage({ params }: { params: { id: string } }) {
    const newsId = params.id;
    const [expand, setExpand] = React.useState(false);
    const { data: listData } = useQuery<ListNewsData>(LIST_NEWS);

    const { data: detailData, loading, error } = useQuery<GetNewsData>(GET_NEWS, {
        variables: { id: newsId },
        skip: !newsId,
    });


    const [imageIdx, setImageIdx] = React.useState(0);
    const news = detailData?.getNews;

    const otherNews = React.useMemo(() => {
        if (!listData?.listNews?.news || !news) return [];
        return listData.listNews.news
            .filter((item: NewsItem) => item.id !== news.id)
            .slice(0, 5); // Ambil 5 berita lain saja
    }, [listData, news]);

    // Ambil daftar gambar dengan aman
    const images: string[] = Array.isArray(news?.imageUrls) ? news.imageUrls : [];
    const totalImages = images.length;

    // URL gambar yang akan ditampilkan, sudah dengan path lengkap
    const displayImage = images[imageIdx]
        ? `https://is3.cloudhost.id/em-ub-2025/${images[imageIdx].replace(/^\/+/, '')}`
        : null;

    // Reset indeks gambar jika berita berubah
    React.useEffect(() => {
        setImageIdx(0);
    }, [newsId]);

    if (loading) return <div className="w-full h-screen flex justify-center items-center"><div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-700"></div></div>;
    if (error) return <div className="w-full h-screen flex justify-center items-center"><div className="text-red-600 text-xl font-semibold">Error: {error.message}</div></div>;
    if (!news) return <div className="w-full h-screen flex justify-center items-center"><div className="text-xl font-semibold">Berita tidak ditemukan.</div></div>;

    return (
        <main>
            <BeritaHero />
            {/* Wrapper utama dengan background */}
            <div className="relative w-full px-[2vw] mt-[-10vw] flex flex-row  gap-[2vw] justify-center mb-[2vw]">
                <Image src={subpageBg} alt="Background" className="h-[50%] w-[70%]" />


                {/* Kontainer konten utama dengan padding */}
                <div className="w-[80%] absolute top-[8%] left-[3%]  ">


                    {/* ✅ Layout utama galeri dan konten berita */}
                    <div className="  w-[75%]">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">

                            {/* --- Kolom Kiri: Navigasi Gambar --- */}
                            {totalImages > 0 && (
                                <div className="flex flex-row md:flex-col items-center md:mt-[5vw] justify-center gap-4 md:gap-6 order-2 ">
                                    {/* Tombol Panah Atas */}
                                    <button
                                        onClick={() => setImageIdx(prev => Math.max(prev - 1, 0))}
                                        disabled={imageIdx === 0}
                                        className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-blue-700 text-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition hover:bg-blue-100"
                                        aria-label="Gambar Sebelumnya"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 15l-6-6-6 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    </button>

                                    {/* Bulatan Navigasi (Dots) */}
                                    <div className="flex md:flex-col gap-3">
                                        {images.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setImageIdx(idx)}
                                                className={clsx(
                                                    "w-4 h-4 rounded-full border-2 border-blue-700 transition-all transform hover:scale-125",
                                                    imageIdx === idx ? "bg-blue-700 scale-125" : "bg-white"
                                                )}
                                                aria-label={`Lihat gambar ${idx + 1}`}
                                            />
                                        ))}
                                    </div>

                                    {/* Tombol Panah Bawah */}
                                    <button
                                        onClick={() => setImageIdx(prev => Math.min(prev + 1, totalImages - 1))}
                                        disabled={imageIdx === totalImages - 1}
                                        className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-blue-700 text-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition hover:bg-blue-100"
                                        aria-label="Gambar Selanjutnya"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    </button>
                                </div>
                            )}

                            {/* --- Kolom Kanan: Gambar Utama & Konten Teks --- */}
                            <div className="flex-1 flex flex-col order-1 md:order-2">
                                {/* Tampilan Gambar Utama */}
                                <div className="relative w-full aspect-video bg-gray-100 rounded-2xl overflow-hidden mb-6 ">
                                    {displayImage ? (
                                        <Image src={displayImage} alt={news.title} layout="fill" className="object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <svg width="80" height="80" fill="none" viewBox="0 0 48 48"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M24 38.05A14.05 14.05 0 0038.05 24 14.05 14.05 0 0024 9.95 14.05 14.05 0 009.95 24 14.05 14.05 0 0024 38.05z" /><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 24.03l5.13 5.12 10.12-10.12" /></svg>
                                            <span className="ml-2">Tidak ada gambar</span>
                                        </div>
                                    )}
                                </div>

                                {/* Judul dan Teks Berita */}
                                <div className="text-justify">
                                    <h1 className="text-[clamp(5vw,5vw,4rem)] font_bold text-[#002787]">{news.title}</h1>
                                    <p className="text-[#0538B9] text-[clamp(2.5vw,2.5vw,1.5rem)] mb-6">{new Date(news.publishedAt).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}</p>
                                    <div className=" text-[#0538B9] text-[clamp(1.5vw,1.5vw,1.5rem)] h-[20vw] md:h-[40vw] scrollbar-hidden overflow-y-auto">
                                        {news.content}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full ]">
                    <h3 className="text-2xl font-bold text-blue-900 mb-6">Berita Lain</h3>
                    <div className="flex flex-col gap-4">
                        {otherNews.map((other, index) => (

                            <Link key={other.id} href={`/berita/${other.id}`} passHref legacyBehavior>
                                <a className="transition transform hover:-translate-y-1 block text-[2vw]">
                                    <BeritaCardSide
                                        title={other.title}
                                        category={other.categoryName}
                                        ministryName={other.ministryName}
                                        color={index % 2 === 0 ? 'blue' : 'orange'}
                                    />
                                </a>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>


        </main>
    );
}