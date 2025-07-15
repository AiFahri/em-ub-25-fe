import styles from './ChatButton.module.css';

const ChatButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <clipPath id="chat-button-shape" clipPathUnits="objectBoundingBox">
            <path d="M0 2-.001 1.245.15.7V.454C.175.007.233.007.35 0H.793C.94.006.986.006.994.442V.628C.987 1.3.721 1.214.448.998H.707C.003 1.261.954 1.039-.004 2.997Z" />
          </clipPath>
        </defs>
      </svg>

      <button className={styles.chatButton}>
        <span className={styles.buttonVisuals}>
          <span className={styles.buttonText}>{children}</span>
        </span>
      </button>
    </>
  );
};

export default ChatButton;
