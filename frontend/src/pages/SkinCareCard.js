import React, { useState } from "react";
import axios from "axios";

const skinTypeMap = {
    "Sensitive": 1,
    "Normal": 2,
    "Dry": 3,
    "Combination": 4,
    "Oily": 5,
    "Acne-Prone": 6
};

const SkinCareCard = ({ skincare, onSoftDelete }) => {
    const [hover, setHover] = useState(false);
    const [btnHover, setBtnHover] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ 
        product_name: skincare.product_name,
        price: skincare.price,
        description: skincare.description,
        image_url: skincare.image_url, 
        link_to_purchase: skincare.link_to_purchase,
        category: skincare.category,
        skin_type: skincare.skin_type, 
    });

    // ✅ Handle form input changes with validation
    const handleInputChange = (e) => {
        let { name, value } = e.target;

        // Prevent negative price input
        if (name === "price" && parseFloat(value) < 0) {
            alert("❌ Price cannot be negative!");
            return;
        }

        setEditData({ ...editData, [name]: value });
    };

    const handleSaveEdit = async () => {
        try {
            console.log("📝 Sending edit request:", editData);

            if (!skincare.id) {
                alert("❌ Error: Missing product ID");
                return;
            }

            // ✅ Convert skin type names to IDs
            const convertedSkinTypes = Array.isArray(editData.skin_type)
                ? editData.skin_type.map(st => skinTypeMap[st] || null).filter(id => id !== null)
                : skincare.skin_type;

            // ✅ Ensure price is valid
            const updatedPrice = parseFloat(editData.price);
            if (isNaN(updatedPrice) || updatedPrice < 0) {
                alert("❌ Price must be a valid number and cannot be negative!");
                return;
            }

            // ✅ Ensure only valid fields are sent
            const updatedData = {
                product_name: editData.product_name || skincare.product_name,
                price: updatedPrice,
                description: editData.description || skincare.description,
                image_url: editData.image_url || skincare.image_url,
                link_to_purchase: editData.link_to_purchase || skincare.link_to_purchase,
                category: editData.category || skincare.category,
                skin_type: convertedSkinTypes,
            };

            console.log("📤 Sending updated data:", updatedData);

            const response = await axios.put(
                `http://127.0.0.1:8000/skincare/update/${skincare.id}`,
                updatedData,
                { headers: { "Content-Type": "application/json" } }
            );

            console.log("✅ Edit response:", response.data);

            if (response.status === 200) {
                alert("✅ Product updated successfully!");
                setIsEditing(false);
                window.location.reload();
            } else {
                throw new Error("Server responded with an error.");
            }
        } catch (error) {
            console.error("❌ Error updating product:", error.response?.data || error);
            alert(`Failed to save changes. Server error: ${JSON.stringify(error.response?.data || error.message)}`);
        }
    };

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

            {/* ✅ Edit Mode */}
            {isEditing ? (
                <div>
                    <input 
                        type="text" 
                        name="product_name" 
                        value={editData.product_name} 
                        onChange={handleInputChange} 
                        style={{ width: "100%", padding: "8px", marginBottom: "10px" }} 
                    />
                    <input 
                        type="number" 
                        name="price" 
                        value={editData.price} 
                        onChange={handleInputChange} 
                        style={{ width: "100%", padding: "8px", marginBottom: "10px" }} 
                    />
                    <textarea 
                        name="description" 
                        value={editData.description} 
                        onChange={handleInputChange} 
                        style={{ width: "100%", padding: "8px", marginBottom: "10px", height: "80px" }} 
                    />
                    <button onClick={handleSaveEdit} style={styles.saveButton}>Save</button>
                    <button onClick={() => setIsEditing(false)} style={styles.cancelButton}>Cancel</button>
                </div>
            ) : (
                <>
                    <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#333" }}>
                        {skincare.product_name}
                    </h3>
                    <p style={{ fontSize: "18px", fontWeight: "bold", color: "black" }}>
                        ${skincare.price.toFixed(2)}
                    </p>
                    <p style={{ fontSize: "14px", color: "#666", textAlign: "left" }}>
                        {skincare.description}
                    </p>

                    {/* ✅ Buy Now Button */}
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

                    {/* ✅ Edit Button */}
                    <button 
                        onClick={() => setIsEditing(true)} 
                        style={styles.editButton}
                    >
                        Edit
                    </button>

                    {/* ✅ Delete Button */}
                    <button 
                        style={styles.deleteButton}
                        onClick={() => onSoftDelete(skincare.id)}
                    >
                        Delete
                    </button>
                </>
            )}
        </div>
    );
};

const styles = {
    editButton: {
        backgroundColor: "#f39c12",
        color: "white",
        padding: "10px 15px",
        borderRadius: "20px",
        cursor: "pointer",
        marginTop: "10px",
        border: "none",
        marginRight: "5px"
    },
    deleteButton: {
        backgroundColor: "#ffb6c1",
        color: "white",
        padding: "10px 15px",
        borderRadius: "20px",
        cursor: "pointer",
        marginTop: "10px",
        border: "none"
    }
};

export default SkinCareCard;
