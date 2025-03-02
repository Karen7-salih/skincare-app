import React, { useState } from "react";

const SkinCareCard = ({ skincare, onSoftDelete }) => {
    const [hover, setHover] = useState(false);
    const [btnHover, setBtnHover] = useState(false);

    return (
        <div 
            className="skincare-item"
            style={{
                textAlign: "center",
                backgroundColor: "#fff",
                borderRadius: "15px",
                padding: "20px",
                boxShadow: hover ? "0px 6px 20px rgba(0, 0, 0, 0.2)" : "0px 4px 15px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden"
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <img 
                src={skincare.image_url} 
                alt={skincare.product_name} 
                style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "10px" }} 
            />
            <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#333" }}>
                {skincare.product_name}
            </h3>
            <p style={{ fontSize: "18px", fontWeight: "bold", color: "black" }}>
                ${skincare.price.toFixed(2)}
            </p>
            <p style={{ fontSize: "14px", color: "#666", textAlign: "left" }}>
                {skincare.description}
            </p>
            <p style={{ fontSize: "14px", fontWeight: "bold", color: "#444" }}>
                <strong>Skin Type:</strong> 
                {Array.isArray(skincare.skin_type) && skincare.skin_type.length > 0 
                   ? skincare.skin_type.join(", ") 
                   : "Unknown"}
                </p>


            {skincare.link_to_purchase ? (
    <a href={skincare.link_to_purchase} target="_blank" rel="noopener noreferrer">
        <button 
            style={{
                padding: "12px 18px",
                borderRadius: "50px",
                cursor: "pointer",
                border: "none",
                background: btnHover ? "#C0A080" : "#D2B48C",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "14px",
                marginTop: "15px",
                transition: "background 0.3s ease, transform 0.2s ease",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
            }}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
        >
            Buy Now
        </button>
    </a>
) : (
    <p style={{ color: "pink", fontSize: "14px", marginTop: "10px" }}>
        Purchase link not available
    </p>
)}


            <button 
                style={{
                backgroundColor: "#e74c3c", 
                color: "white",
                padding: "8px 12px",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px",
                border: "none",
                display: skincare.id ? "block" : "none" // ✅ Always show the button if ID exists
    }}
    onClick={() => onSoftDelete(skincare.id)}
>
    Delete
</button>

        </div>
    );
};

export default SkinCareCard;
