import Image from 'next/image';
import React from 'react';
import type { StaticImageData } from 'next/image';


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
    isActive: boolean; 
    shadowColor: string; 
}

const Folder: React.FC<FolderProps> = ({ nama, imageUrl, isHovered, isDimmed, isActive, shadowColor }) => {

    const finalShadowColor = hexToRgba(shadowColor, 0.4);

    let transform = 'scale(1) translateY(0)';
    let opacity = '1';
    if (isHovered) {
        transform = 'scale(1.15) translateY(-1.5vw)';
    } else if (isActive) {
        transform = 'scale(1.05)';
        opacity = '1';
    } else if (isDimmed) {
        transform = 'scale(0.9)';
        opacity = '0.8';
    }

    const dynamicContainerStyle: React.CSSProperties = {
        transform: transform,
        opacity: isDimmed ? '0.6' : '1',
        filter: isHovered || isActive ? `drop-shadow(0 12px 20px ${shadowColor})` : 'none',
        transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out, filter 0.3s ease-in-out',
        cursor: 'pointer',
    };

    return (
        <div
            className="relative w-[23vw]  sm:w-[16vw] aspect-[10/9]"
            style={dynamicContainerStyle}
        >
            <Image
                src={imageUrl}
                alt={nama}
                layout="fill"
                objectFit="contain"
            />

            <div
                style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%', 
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'start', 
                    alignItems: 'end', 
                    textAlign: 'start', 
                    color: 'white',
                    fontWeight: 600,
                    fontSize: 'clamp(2vw, 2.5vw, 1rem)', 
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