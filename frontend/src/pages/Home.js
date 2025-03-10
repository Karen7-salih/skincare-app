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

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const url = selectedCategory
                    ? `http://127.0.0.1:8000/skincare/category/${encodeURIComponent(selectedCategory)}`
                    : `http://127.0.0.1:8000/skincare`;

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

    const normalizeSkinType = (skinType) => {
        if (!skinType) return ["Unknown"];
        if (Array.isArray(skinType)) return skinType.map(st => skinTypeMap[st] || st);
        if (typeof skinType === "string") return [skinTypeMap[parseInt(skinType, 10)] || skinType];
        return ["Unknown"];
    };

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
            <div style={styles.heroContainer}>
                <img src="/hero-image.jpg" alt="Hero Banner" style={styles.heroImage} />
            </div>

            <Categories setSelectedCategory={setSelectedCategory} />

            <div style={styles.couponContainer}>
                <div style={styles.couponTitle}>SPECIAL OFFER</div>
                <div style={styles.couponText}>Kareen's iHerb coupon for 5% off - LOQ6309</div>
            </div>

            {loading && <p>Loading skincare products...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <div style={styles.grid}>
                {products.length > 0 ? (
                    products.map((product) => (
                        <SkinCareCard key={product.id} skincare={product} onSoftDelete={handleSoftDelete} />
                    ))
                ) : (
                    <p>No skincare products found.</p>
                )}
            </div>

            {/* Follow Us Section */}
            <div style={styles.followUsContainer}>
                <h3 style={styles.followTitle}>FOLLOW US</h3>
                <div style={styles.socialIcons}>
                    <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                        <img src="/youtube-icon.png" alt="YouTube" style={styles.icon} />
                    </a>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src="/facebook-icon.png" alt="Facebook" style={styles.icon} />
                    </a>
                    <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
                        <img src="/tiktok-icon.png" alt="TikTok" style={styles.icon} />
                    </a>
                    <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">
                        <img src="/pinterest-icon.png" alt="Pinterest" style={styles.icon} />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src="/instagram-icon.png" alt="Instagram" style={styles.icon} />
                    </a>
                </div>
            </div>

            <footer style={styles.footer}>
                <p>© 2025 Make the Skin Care. All rights reserved.</p>
                <p>Created with 💖 by Kareen</p>
            </footer>
        </div>
    );
};

const styles = {
    couponContainer: {
        width: "100%",
        backgroundColor: "#ff7f50",
        color: "white",
        padding: "15px 0",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "20px",
        marginTop: "20px",
        marginBottom: "20px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        borderRadius: "4px",
    },
    couponTitle: {
        fontWeight: "800",
        fontSize: "22px",
        letterSpacing: "1px",
        marginBottom: "5px",
        textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
    },
    couponText: {
        fontWeight: "600",
    },
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
    },
    followUsContainer: {
        textAlign: "center",
        backgroundColor: "#ff7f50", // Changed from #000 to #ff7f50 to match coupon section
        padding: "30px",
        color: "white",
        fontWeight: "bold",
    },
    followTitle: {
        fontSize: "20px",
        marginBottom: "15px",
    },
    socialIcons: {
        display: "flex",
        justifyContent: "center",
        gap: "20px",
    },
    icon: {
        width: "40px",
        height: "40px",
        cursor: "pointer",
        transition: "transform 0.3s ease-in-out",
    },
    footer: {
        marginTop: "40px",
        textAlign: "center",
        padding: "15px",
        backgroundColor: "#333",
        color: "white",
        fontSize: "14px",
    },
};

export default Home;