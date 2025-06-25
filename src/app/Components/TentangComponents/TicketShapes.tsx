// Komponen ini hanya untuk mendefinisikan bentuk SVG, tidak akan terlihat.
const TicketShapes = () => (
    <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
            {/* Cetakan untuk bagian ATAS tiket */}
            <clipPath id="ticket-top-shape" clipPathUnits="objectBoundingBox">
                <path d="M 0,0 H 1 V 0.85 C 0.9,0.85 0.8,0.95 0.7,0.95 H 0.3 C 0.2,0.95 0.1,0.85 0,0.85 V 0 Z" />
            </clipPath>
            {/* Cetakan untuk bagian BAWAH tiket */}
            <clipPath id="ticket-bottom-shape" clipPathUnits="objectBoundingBox">
                <path d="M 0,1 H 1 V 0.15 C 0.9,0.15 0.8,0.05 0.7,0.05 H 0.3 C 0.2,0.05 0.1,0.15 0,0.15 V 1 Z" />
            </clipPath>
        </defs>
    </svg>
);

export default TicketShapes;