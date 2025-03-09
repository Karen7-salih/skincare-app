import React, { useState } from "react";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://formspree.io/f/xvgzedej", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
                setFormData({ name: "", email: "", message: "" });
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

            {success && <p style={styles.successMessage}> Your message has been sent!</p>}
            {error && <p style={styles.errorMessage}> Failed to send message. Try again.</p>}

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
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    style={styles.textarea}
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
        backgroundImage: "url('contact-bg.jpg')", //Background Image Added
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        color: "#fff" // Ensure text is readable
    },
    title: { fontSize: "28px", fontWeight: "bold", marginBottom: "10px" , color: "#000"},
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
};

export default Contact;
