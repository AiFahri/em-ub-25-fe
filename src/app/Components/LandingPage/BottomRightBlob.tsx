export default function BottomRightBlob() {
  return (
    <svg className="hidden">
      <clipPath id="br-blob" clipPathUnits="objectBoundingBox">
        <path
          d="
          M 0,0 
          H 1 
          V 0.85 
          C 0.95,0.88 0.95,1 0.85,1 
          H 0 
          Z
        "
        />
      </clipPath>
    </svg>
  );
}
