import React, { useEffect, useState } from "react";
import axios from "axios";
import Categories from "./Categories"; 
import SkinCareCard from "./SkinCareCard"; 

const skinTypeMap = {
    1: "Sensitive",
    2: "Normal",
    3: "Dry",
    4: "Combination",
    5: "Oily",
    6: "Acne-Prone"
};

const Home = ({ selectedCategory, setSelectedCategory }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch products when the selected category changes
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const url = selectedCategory
                    ? `http://127.0.0.1:8000/skincare/category/${encodeURIComponent(selectedCategory)}`
                    : `http://127.0.0.1:8000/skincare`; // Default fetch for all products

                const response = await axios.get(url);
                const updatedProducts = response.data.map(product => ({
                    ...product,
                    skin_type: normalizeSkinType(product.skin_type),
                }));
                setProducts(updatedProducts);
            } catch (error) {
                setError("Failed to fetch skincare products.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [selectedCategory]);

    // Normalize skin type for display
    const normalizeSkinType = (skinType) => {
        if (!skinType) return ["Unknown"];  // If skin type is empty, return "Unknown"
        if (Array.isArray(skinType)) return skinType.map(st => skinTypeMap[st] || st);  // If it's an array, map it to readable names
        if (typeof skinType === "string") return [skinTypeMap[parseInt(skinType, 10)] || skinType];  // If it's a string, convert to number & get the mapped name
        return ["Unknown"];
    };

    // Handle product deletion
    const handleSoftDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            await axios.put(`http://127.0.0.1:8000/skincare/delete/${id}`);
            setProducts(prevProducts => prevProducts.filter(p => p.id !== id));
        } catch (err) {
            alert("Failed to delete product.");
        }
    };

    return (
        <div>
            {/* Hero Image Section */}
            <div style={styles.heroContainer}>
                <img 
                    src="/hero-image.jpg"  // Path to your image
                    alt="Hero Banner"
                    style={styles.heroImage}
                />
            </div>

            {/* Categories Section */}
            <Categories setSelectedCategory={setSelectedCategory} />

            {/* Enhanced Coupon Banner */}
            <div style={styles.couponContainer}>
                <div style={styles.couponTitle}>SPECIAL OFFER</div>
                <div style={styles.couponText}>
                    Kareen's iHerb coupon for 5% off - LOQ6309
                </div>
            </div>

            {/* Loading and Error Handling */}
            {loading && <p>Loading skincare products...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Product List */}
            <div style={styles.grid}>
                {products.length > 0 ? (
                    products.map((product) => (
                        <SkinCareCard key={product.id} skincare={product} onSoftDelete={handleSoftDelete} />
                    ))
                ) : (
                    <p>No skincare products found.</p>
                )}
            </div>
        </div>
    );
};

const styles = {
    couponContainer: {
        width: "100%",
        backgroundColor: "#ff7f50",  // Prettier pink color
        color: "white",
        padding: "15px 0", // Taller banner
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "20px", // Larger text
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
        marginTop: "20px", // Add space after categories
        marginBottom: "20px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)", // Subtle shadow for depth
        borderRadius: "4px", // Slightly rounded corners
    },
    couponTitle: {
        fontWeight: "800", // Extra bold
        fontSize: "22px",
        letterSpacing: "1px",
        marginBottom: "5px",
        textShadow: "1px 1px 2px rgba(0,0,0,0.2)", // Text shadow for better visibility
    },
    couponText: {
        position: "relative", // Coupon text with no animation
        whiteSpace: "nowrap",
        fontWeight: "600", // Semi-bold
    },
    heroContainer: {
        width: "100%",
        height: "400px",  // Adjust this as needed
        overflow: "hidden",
    },
    heroImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover", // Ensures the image covers the whole container
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "20px",
        padding: "20px",
    },
};

export default Home;
