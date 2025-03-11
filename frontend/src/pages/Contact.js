import React, { useState } from "react";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
        honeypot: "", // Hidden field to prevent bots
    });

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    // Function to sanitize input (prevent XSS)
    const sanitizeInput = (value) => {
        return value.replace(/</g, "&lt;").replace(/>/g, "&gt;"); // Prevents script injections
    };

    // Validate email format
    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    // Handle input change with validation
    const handleChange = (e) => {
        let { name, value } = e.target;
        
        // Sanitize all inputs
        value = sanitizeInput(value);

        // Validate name (only letters & spaces allowed)
        if (name === "name") {
            value = value.replace(/[^a-zA-Z\s]/g, ""); 
        }

        // Limit message length to 500 characters
        if (name === "message" && value.length > 500) {
            return;
        }

        setFormData({ ...formData, [name]: value });
    };

    // Prevent bots from submitting (honeypot field check)
    const isBot = () => {
        return formData.honeypot !== "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isBot()) {
            console.warn("Bot detected! Submission blocked.");
            return;
        }

        if (!isValidEmail(formData.email)) {
            alert("Invalid email format!");
            return;
        }

        try {
            const response = await fetch("https://formspree.io/f/xvgzedej", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
                setFormData({ name: "", email: "", message: "", honeypot: "" });
            } else {
                setError(true);
                setTimeout(() => setError(false), 3000);
            }
        } catch (err) {
            console.error("Error sending message:", err);
            setError(true);
            setTimeout(() => setError(false), 3000);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Contact Us</h2>
            <p style={styles.subtitle}>Have a question? We'd love to hear from you!</p>

            {success && <p style={styles.successMessage}> ✅ Your message has been sent!</p>}
            {error && <p style={styles.errorMessage}> ❌ Failed to send message. Try again.</p>}

            <form style={styles.form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <textarea
                    name="message"
                    placeholder="Your Message (Max 500 chars)"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    style={styles.textarea}
                />
                {/* Honeypot field (hidden) */}
                <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    style={styles.hiddenInput}
                />
                <button type="submit" style={styles.button}>Send Message</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        textAlign: "center",
        padding: "50px",
        fontFamily: "'Poppins', sans-serif",
        maxWidth: "600px",
        margin: "auto",
        backgroundImage: "url('contact-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        color: "#fff"
    },
    title: { fontSize: "28px", fontWeight: "bold", marginBottom: "10px", color: "#000" },
    subtitle: { fontSize: "16px", color: "#000", marginBottom: "20px" },
    form: { display: "flex", flexDirection: "column", gap: "15px" },
    input: { padding: "12px", borderRadius: "5px", border: "1px solid #ddd", fontSize: "16px" },
    textarea: { padding: "12px", borderRadius: "5px", border: "1px solid #ddd", fontSize: "16px", height: "100px" },
    button: {
        padding: "12px",
        backgroundColor: "#ff7f50",
        color: "white",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        cursor: "pointer",
        fontWeight: "bold",
        transition: "background 0.3s ease",
    },
    successMessage: { color: "lightgreen", fontWeight: "bold", marginBottom: "15px" },
    errorMessage: { color: "lightcoral", fontWeight: "bold", marginBottom: "15px" },
    hiddenInput: { display: "none" }, // Honeypot field hidden from users
};

export default Contact;
