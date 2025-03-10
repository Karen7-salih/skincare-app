import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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

const Categories = ({ setSelectedCategory, selectedCategory }) => {
  const [activeCategory, setActiveCategory] = useState(selectedCategory);

  useEffect(() => {
    setActiveCategory(selectedCategory); // Ensure the active category is updated whenever selectedCategory changes
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.type || null); // Update selected category when clicked
  };

  return (
    <div style={styles.container}>
      <h2>Skincare Categories</h2>
      <div style={styles.grid}>
        {categories.map((category) => (
          <div
            key={category.name}
            style={{
              ...styles.categoryCard,
              ...(activeCategory === category.type ? styles.selectedCategory : {}),
            }}
            onClick={() => handleCategoryClick(category)}
          >
            <div style={styles.imageContainer}>
              <img src={category.image} alt={category.name} style={styles.image} />
              {activeCategory === category.type && <div style={styles.selectionRing}></div>}
            </div>
            <p style={{
              ...styles.categoryName,
              ...(activeCategory === category.type ? styles.selectedCategoryName : {})
            }}>
              {category.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { 
    textAlign: "center", 
    padding: "30px", 
    backgroundColor: "#FAFAFA" 
  },
  grid: { 
    display: "flex", 
    justifyContent: "center", 
    flexWrap: "wrap", 
    gap: "30px" 
  },
  categoryCard: {
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
    padding: "10px",
    width: "150px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    position: "relative",
    borderRadius: "50%",
    width: "140px",
    height: "140px",
    overflow: "hidden",
  },
  selectedCategory: {
    transform: "scale(1.1)",  // More subtle scale
  },
  selectionRing: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: "50%",
    border: "4px solid #FF85A2",  // Pink border for selection
    boxShadow: "0px 0px 15px rgba(255, 133, 162, 0.6)",  // Glowing effect
  },
  image: { 
    width: "100%", 
    height: "100%", 
    borderRadius: "50%", 
    objectFit: "cover" 
  },
  categoryName: {
    marginTop: "10px",
    fontWeight: "normal",
    transition: "all 0.3s ease",
  },
  selectedCategoryName: {
    fontWeight: "bold",
    color: "#FF85A2",  // Matching the selection ring color
  },
};

export default Categories;