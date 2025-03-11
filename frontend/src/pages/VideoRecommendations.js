import React from "react";

const videoLinks = [
  { id: "7438681377974881567", productId: 21, productName: "Needly Exfoliating Facial Pads" },
  { id: "7423465992962968849", productId: 4, productName: "Inkey List Oat Cleansing Balm" },
  { id: "7265109361565895966", productId: 5, productName: "Cosrx HA Intensive Cream" },
  { id: "6979257861310287109", productId: 27, productName: "ZitSticka MEGASHADE Sunscreen Serum SPF" },
];

const VideoRecommendations = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>  Our Products Video Recommendations </h2>
      <div style={styles.grid}>
        {videoLinks.map((video, index) => (
          <div key={index} style={styles.videoContainer}>
            {/* Display product name above the video */}
            <h3 style={styles.productName}>{video.productName}</h3>

            <iframe
              src={`https://www.tiktok.com/embed/${video.id}`} // Use embed URL format
              title={`TikTok Video ${index + 1}`}
              style={styles.video}
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    backgroundImage: "url('/background.jpg')",
    backgroundSize: "cover", // This will cover the entire container
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed", // This keeps the background fixed while scrolling
    padding: "20px",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
    textShadow: "0 0 5px white", // adds shadow to make text readable on any background
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  videoContainer: {
    position: "relative",
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Semi-transparent white for just the video containers
    borderRadius: "10px",
    padding: "15px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  video: {
    width: "100%",
    height: "500px", // Adjust as needed
    borderRadius: "10px",
    border: "none",
    overflow: "hidden", // Ensures no scroll within the iframe
  },
  productName: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#333",
  },
};

export default VideoRecommendations;