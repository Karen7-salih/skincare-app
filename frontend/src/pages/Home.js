import React, { useEffect, useState } from "react";
import axios from "axios";
import Categories from "./Categories";
import SkinCareCard from "./SkinCareCard"; // ✅ Import to display products

const skinTypeMap = {
    1: "Sensitive",
    2: "Normal",
    3: "Dry",
    4: "Combination",
    5: "Oily",
    6: "Acne-Prone"
};

const Home = ({ selectedCategory, setSelectedCategory }) => { // ✅ Receive props from App.js
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const url = selectedCategory 
                    ? `http://127.0.0.1:8000/skincare/category/${encodeURIComponent(selectedCategory)}`
                    : `http://127.0.0.1:8000/skincare`; // ✅ Fetch all products when category is null
    
                console.log(`📢 Fetching products for category: ${selectedCategory || "ALL"}`);

                const response = await axios.get(url);

                // ✅ Log full API response
                console.log("🔍 Full API Response:", response.data);

                // ✅ Ensure skin_type is always converted to names
                const updatedProducts = response.data.map(product => ({
                    ...product,
                    skin_type: normalizeSkinType(product.skin_type) // ✅ Process skin type here
                }));

                setProducts(updatedProducts);
            } catch (error) {
                console.error("❌ Error fetching products:", error);
                setError("Failed to fetch skincare products.");
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
    
        fetchAllProducts();
    }, [selectedCategory]); // ✅ Re-fetch when category changes

    // ✅ Function to normalize `skin_type` for both "View All" and Categories
    const normalizeSkinType = (skinType) => {
        if (!skinType) return ["Unknown"]; // ✅ Handle missing values

        if (Array.isArray(skinType)) {
            // ✅ If it's already an array of numbers or names
            return skinType.map(st => skinTypeMap[st] || st);
        }

        if (typeof skinType === "string") {
            try {
                // ✅ If it's a JSON string (e.g., "[1,5,6]")
                const parsedIds = JSON.parse(skinType);
                if (Array.isArray(parsedIds)) {
                    return parsedIds.map(id => skinTypeMap[id] || id);
                }
            } catch (error) {
                // ✅ If parsing fails, it's likely a single number as a string
                return [skinTypeMap[parseInt(skinType, 10)] || skinType];
            }
        }

        if (typeof skinType === "number") {
            // ✅ If it's a single number, convert it to a name
            return [skinTypeMap[skinType] || "Unknown"];
        }

        return ["Unknown"]; // ✅ Default fallback
    };

    // ✅ DELETE Function to remove from UI and Database
    const handleSoftDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        
        try {
            await axios.put(`http://127.0.0.1:8000/skincare/delete/${id}`);
            setProducts(prevProducts => prevProducts.filter(p => p.id !== id));  // ✅ Remove from UI
        } catch (err) {
            console.error("❌ Error deleting product:", err);
            alert("Failed to delete product.");
        }
    };

    return (
        <div>
            {/* Hero Image Section */}
            <div style={styles.heroContainer}>
                <img 
                    src="/hero-image.jpg" 
                    alt="Hero Banner"
                    style={styles.heroImage} 
                />
            </div>

            {/* Categories Section */}
            <Categories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} /> {/* ✅ Pass selectedCategory */}

            {/* Loading & Error Handling */}
            {loading && <p style={styles.loading}>Loading skincare products...</p>}
            {error && <p style={styles.error}>{error}</p>}

            {/* Product List */}
            <div style={styles.grid}>
                {products.length > 0 ? (
                    products.map((product) => (
                        <SkinCareCard 
                            key={product.id} 
                            skincare={product}
                            onSoftDelete={handleSoftDelete} 
                        />
                    ))
                ) : (
                    <p style={styles.noProducts}>No skincare products found.</p>
                )}
            </div>
        </div>
    );
};

const styles = {
    heroContainer: {
        width: "100%",
        height: "400px", 
        overflow: "hidden",
    },
    heroImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "20px",
        padding: "20px",
        maxWidth: "1200px",
        margin: "auto"
    },
    loading: {
        textAlign: "center",
        fontSize: "18px",
        fontWeight: "bold",
        color: "#555",
        marginTop: "50px"
    },
    error: {
        color: "red",
        fontSize: "16px",
        fontWeight: "bold",
        textAlign: "center",
        marginTop: "20px"
    },
    noProducts: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#888",
        textAlign: "center"
    }
};

export default Home;
