import React, { useState } from "react";

const categories = [
    { name: "View All", image: "/all.jpg", type: null },
    { name: "Cleansers", image: "/cleansers.jpg", type: "Cleansers" },
    { name: "Moisturizers", image: "/moisturizers.jpg", type: "Moisturizers" },
    { name: "Sunscreens", image: "/sunscreens.jpg", type: "Sunscreens" },
    { name: "Toners & Mists", image: "/toners.jpg", type: "Toners & Mists" },
    { name: "Serums & Treatments", image: "/serums.jpg", type: "Serums & Treatments" },
    { name: "Exfoliators & Peeling Pads", image: "/exfoliators.jpg", type: "Exfoliators & Peeling Pads" },
    { name: "Acne Patches & Spot Treatments", image: "/patches.jpg", type: "Acne Patches & Spot Treatments" },
    { name: "Sheet and Clay Masks", image: "/masks.jpg", type: "Sheet and Clay Masks" },
];

const Categories = ({ setSelectedCategory }) => {
    const [activeCategory, setActiveCategory] = useState(null);

    const handleCategoryClick = (category) => {
        setActiveCategory(category.type);
        setSelectedCategory(category.type || null); // Ensures "View All" works
    };
    
    

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Skincare Categories</h2>
            <div style={styles.grid}>
                {categories.map((category) => (
                    <div
                        key={category.name}
                        onClick={() => handleCategoryClick(category)}
                        style={{
                            ...styles.categoryCard,
                            ...(activeCategory === category.type ? styles.selectedCategory : {}),
                        }}
                    >
                        <img src={category.image} alt={category.name} style={styles.image} />
                        <p style={styles.text}>{category.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: { textAlign: "center", padding: "30px", backgroundColor: "#FAFAFA" },
    grid: { display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "30px", marginBottom: "40px" },
    categoryCard: {
        textAlign: "center",
        cursor: "pointer",
        transition: "transform 0.3s ease-in-out",
        padding: "10px",
        borderRadius: "50%", 
        width: "150px", 
        height: "150px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    selectedCategory: { 
        boxShadow: "0px 0px 12px rgba(255, 255, 255, 1)", 
        transform: "scale(1.1)", 
        transition: "all 0.3s ease-in-out",
    },
    image: { width: "140px", height: "140px", borderRadius: "50%", objectFit: "cover", border: "3px solid #ddd" },
    text: { fontSize: "14px", fontWeight: "bold", color: "#333", marginTop: "8px" },
};

export default Categories;
