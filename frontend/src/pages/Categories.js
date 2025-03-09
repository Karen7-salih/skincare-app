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
          >
            <div
              onClick={() => handleCategoryClick(category)} // Handle category click to set selected category
              style={{ cursor: "pointer", textAlign: "center" }}
            >
              <img src={category.image} alt={category.name} style={styles.image} />
              <p>{category.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { textAlign: "center", padding: "30px", backgroundColor: "#FAFAFA" },
  grid: { display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "30px" },
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
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.3)",  // Increased shadow size and opacity
    transform: "scale(3.1)",  // Slightly enlarge the selected category
    transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transition
  },
  image: { width: "140px", height: "140px", borderRadius: "50%", objectFit: "cover" },
};
export default Categories;
