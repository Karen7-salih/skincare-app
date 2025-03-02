import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ setSelectedCategory }) => {
    return (
        <nav style={styles.navbar}>
            {/* Left Side: Home */}
            <div style={styles.leftNav}>
                <Link 
                    to="/" 
                    style={styles.link}
                    onClick={() => setSelectedCategory(null)} // ✅ Reset category when clicking Home
                >
                    Home
                </Link>
            </div>

            {/* Center: "Skincare" Logo */}
            <div style={styles.logo}>
                Make the Skin Care
            </div>

            {/* Right Side: Add Product, About, Contact */}
            <div style={styles.rightNav}>
                <Link to="/add" style={styles.link}>Add Product</Link>
                <Link to="/about" style={styles.link}>About</Link>
                <Link to="/contact" style={styles.link}>Contact</Link>
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        padding: "15px 40px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000
    },
    leftNav: {
        display: "flex",
        gap: "20px",
        listStyle: "none",
        margin: 0,
        padding: 0,
    },
    rightNav: {
        display: "flex",
        gap: "20px",
        listStyle: "none",
        margin: 0,
        padding: 0,
    },
    logo: {
        fontSize: "24px", // ✅ Adjusted for cuteness
        fontWeight: "bold",
        fontFamily: "'Playfair Display', serif", // ✅ Keeping the cute font
        color: "#333",
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
    },
    link: {
        textDecoration: "none",
        color: "#333",
        fontWeight: "bold",
        fontSize: "16px",
        fontFamily: "'Poppins', sans-serif",
        transition: "color 0.3s ease",
    }
};

export default Navbar;
