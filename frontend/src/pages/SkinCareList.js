import React, { useEffect, useState } from "react";
import axios from "axios";
import SkinCareCard from "./SkinCareCard";

// const skinTypeMap = {
//     1: "Sensitive",
//     2: "Normal",
//     3: "Dry",
//     4: "Combination",
//     5: "Oily",
//     6: "Acne-Prone"
// };

const FetchSkinCareList = ({ selectedCategory }) => {
    const [skincareData, setSkincareData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
        
            try {
                const url = selectedCategory 
                    ? `http://127.0.0.1:8000/skincare/category/${encodeURIComponent(selectedCategory)}`
                    : `http://127.0.0.1:8000/skincare`;
        
                console.log(` Fetching skincare products... Category: ${selectedCategory || "ALL"}`);
                
                const response = await axios.get(url);
                console.log(" API Response:", response.data);
        
                if (!Array.isArray(response.data)) {
                    throw new Error("Invalid API response format. Expected an array.");
                }
        
                // Check if skin_type is correctly formatted
                response.data.forEach((product, index) => {
                    console.log(` Product ${index + 1} - skin_type:`, product.skin_type);
                });
        
                setSkincareData(response.data.map(product => ({
                    ...product,
                    skin_type: processSkinType(product.skin_type) 
                })));
            } catch (err) {
                console.error("Error fetching skincare products:", err);
                setError("Failed to fetch skincare products. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        

        fetchData();
    }, [selectedCategory]);

    const processSkinType = (skinType) => {
        if (!skinType) return ["Unknown"]; //  Handle missing values
    
        if (Array.isArray(skinType)) {
            return skinType; //  API already sends names, return as is
        }
    
        if (typeof skinType === "string") {
            return [skinType]; //  Wrap single name in an array
        }
    
        return ["Unknown"]; //  Default fallback
    };
    
    const handleSoftDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            await axios.put(`http://127.0.0.1:8000/skincare/delete/${id}`);
            setSkincareData(prevData => prevData.filter(item => item.id !== id));
        } catch (err) {
            console.error("Error deleting product:", err);
            alert("Failed to delete product.");
        }
    };

    return (
        <div style={styles.container}>
            {loading && <p style={styles.loading}>Loading skincare products...</p>}
            {error && <p style={styles.error}>{error}</p>}
            
            {!loading && !error && (
                <div style={styles.grid}>
                    {skincareData.length > 0 ? (
                        skincareData.map((skincare) => (
                            <SkinCareCard key={skincare.id} skincare={skincare} onSoftDelete={handleSoftDelete} />
                        ))
                    ) : (
                        <p style={styles.noProducts}>No skincare products found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: { textAlign: "center", marginTop: "20px", fontFamily: "'Poppins', sans-serif", backgroundColor: "#FAFAFA" },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px", padding: "20px" },
    loading: { textAlign: "center", fontSize: "18px", fontWeight: "bold", color: "#555", marginTop: "50px" },
    error: { color: "red", fontSize: "16px", fontWeight: "bold", textAlign: "center", marginTop: "20px" },
    noProducts: { fontSize: "18px", fontWeight: "bold", color: "#888" },
};

export default FetchSkinCareList;
