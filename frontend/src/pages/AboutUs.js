import React from "react";

const AboutUs = () => {
    return (
        <div style={styles.background}>
            <div style={styles.container}>
                <h1 style={styles.title}>About Us</h1>
                <p style={styles.text}>
                    Tired of spending **hours** researching skincare products, checking ingredients,  
                    and wondering if they are truly safe for your skin?  
                    <strong>We’ve done the work for you.</strong>  
                </p>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>Why Choose Make the Skin Care?</h2>
                    <p style={styles.text}>
                        We believe in **skincare made simple**. Our goal is to provide a **curated selection of skincare**  
                        that is **100% acne-safe, fungal acne-safe, and free from harmful ingredients**.  
                        No more **guessing** or **researching**—we ensure every product meets your skin’s needs.
                    </p>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>We Care About Your Skin</h2>
                    <ul style={styles.list}>
                        <li><strong>✔ Handpicked Selection:</strong> Only products that are **safe & effective**.</li>
                        <li><strong>✔ Acne & Fungal Acne Safe:</strong> No pore-clogging or irritating ingredients.</li>
                        <li><strong>✔ Fast & Easy:</strong> Click a product and go straight to purchase—it’s that simple.</li>
                        <li><strong>✔ Science-Backed Choices:</strong> Approved by skincare enthusiasts & experts.</li>
                    </ul>
                </div>

                <div style={styles.line}></div> {/* Divider Line */}

                <p style={styles.finalText}>
                    We are here to **Make the Skin Care** **simple, effortless, and stress-free** for you.  
                    Because skincare should be about results, not confusion.  
                </p>
            </div>
        </div>
    );
};

const styles = {
    background: {
        backgroundImage: "url('/about-bg.jpg')", // Adding the  bubble background i picked
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        maxWidth: "800px",
        backgroundColor: "rgba(255, 255, 255, 0.85)", // Slight white overlay for readability
        padding: "50px 30px",
        borderRadius: "12px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        fontFamily: "'Poppins', sans-serif",
        textAlign: "center",
        color: "#333",
    },
    title: {
        fontSize: "36px",
        fontWeight: "bold",
        fontFamily: "'Playfair Display', serif",
        marginBottom: "20px",
    },
    text: {
        fontSize: "18px",
        lineHeight: "1.6",
        marginBottom: "20px",
    },
    section: {
        marginTop: "40px",
        textAlign: "left",
    },
    sectionTitle: {
        fontSize: "24px",
        fontWeight: "bold",
        fontFamily: "'Playfair Display', serif",
        marginBottom: "10px",
        color: "#555",
    },
    list: {
        textAlign: "left",
        listStyle: "none",
        fontSize: "18px",
        lineHeight: "1.8",
        paddingLeft: "0",
    },
    line: {
        margin: "40px auto",
        width: "80%",
        height: "1px",
        backgroundColor: "#ddd",
    },
    finalText: {
        fontSize: "20px",
        fontWeight: "bold",
        fontFamily: "'Playfair Display', serif",
        color: "#444",
        textAlign: "center",
        marginTop: "20px",
    },
};

export default AboutUs;
