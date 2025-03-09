import React, { useEffect, useState } from "react";
import axios from "axios";
import SkinCareCard from "./SkinCareCard";

const FetchSkinCareList = ({ selectedCategory }) => {
  const [skincareData, setSkincareData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Use the new API endpoint that fetches products by category
        const url = selectedCategory
          ? `http://127.0.0.1:8000/skincare/category/${encodeURIComponent(selectedCategory)}`
          : `http://127.0.0.1:8000/skincare`; // Fetch all products if no category is selected

        console.log(`Fetching skincare products for ${selectedCategory || "ALL"}`);

        const response = await axios.get(url);

        if (!Array.isArray(response.data)) {
          throw new Error("Invalid API response format. Expected an array.");
        }

        setSkincareData(response.data); // Update with the filtered data
      } catch (err) {
        console.error("Error fetching skincare products:", err);
        setError("Failed to fetch skincare products.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
}, [selectedCategory]);  // Refetch when the selectedCategory changes


  return (
    <div style={styles.container}>
      {loading && <p>Loading skincare products...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && (
        <div style={styles.grid}>
          {skincareData.length > 0 ? (
            skincareData.map((skincare) => (
              <SkinCareCard key={skincare.id} skincare={skincare} />
            ))
          ) : (
            <p>No skincare products found.</p>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { textAlign: "center", marginTop: "20px", fontFamily: "'Poppins', sans-serif", backgroundColor: "#FAFAFA" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px", padding: "20px" },
};

export default FetchSkinCareList;
