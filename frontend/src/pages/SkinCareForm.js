import { useFormik } from "formik";
import { object, string, number, array } from "yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const SkinCareForm = () => {
    const skinTypeMap = {
        "Sensitive Skin": 1,
        "Normal Skin": 2,
        "Dry Skin": 3,
        "Combination Skin": 4,
        "Oily Skin": 5,
        "Acne-Prone Skin": 6
    };

    const skinTypeOptions = Object.keys(skinTypeMap);

    const sendNewSkinCare = async (skincaredata) => {
        console.log("Mutation called with:", skincaredata);
        const result = await axios.post("http://localhost:8000/skincare", skincaredata);
        return result.data;
    };

    const mutation = useMutation({
        mutationFn: sendNewSkinCare,
        onSuccess: () => {
            console.log("Product added successfully!");
        },
    });

    const validationSchema = object({
        product_name: string()
            .required("Product name is required")
            .max(35, "Product name can be at most 35 characters")
            .matches(/^[a-zA-Z\s]+$/, "Product name cannot contain numbers or special characters"),
        price: number()
            .required("Price is required")
            .positive("Price must be a positive number")
            .min(5, "Price must be at least $5")
            .max(1000, "Price cannot be more than $1000")
            .typeError("Price must be a number"),
        description: string()
            .required("Description is required")
            .min(10, "Description must be at least 10 characters")
            .max(1000, "Description cannot exceed 1000 characters"),
        image_url: string().url("Must be a valid URL").nullable(),
        link_to_purchase: string().url("Must be a valid URL").nullable(),
        skin_type: array().of(string()).min(1, "Select at least one skin type"),
    });

    const formik = useFormik({
        initialValues: {
            product_name: "",
            price: "",
            skin_type: [],
            description: "",
            image_url: "",
            link_to_purchase: ""
        },
        validationSchema,
        onSubmit: (values) => {
            console.log("Before sending:", values);
            const formattedValues = {
                ...values,
                skin_type: values.skin_type.map(type => skinTypeMap[type] || 1), // Convert names to IDs
                price: parseFloat(values.price),
                category: values.category || "Other", // ✅ Ensure category is not null
            };             
            console.log("Fixed values:", formattedValues);
            mutation.mutate(formattedValues);
        },
    });

    return (
        <div style={styles.background}>
            <div style={styles.formContainer}>
                <h1 style={styles.title}>Add a Skincare Product</h1>
                <form style={styles.form} onSubmit={formik.handleSubmit}>
                    
                    <label style={styles.label}>Product Name</label>
                    <input name="product_name" type="text" onChange={formik.handleChange} value={formik.values.product_name} style={styles.input} />
                    {formik.errors.product_name && <div style={styles.error}>{formik.errors.product_name}</div>}

                    <label style={styles.label}>Price ($)</label>
                    <input name="price" type="text" onChange={formik.handleChange} value={formik.values.price} style={styles.input} />
                    {formik.errors.price && <div style={styles.error}>{formik.errors.price}</div>}

                    <label style={styles.label}>Description</label>
                    <textarea name="description" onChange={formik.handleChange} value={formik.values.description} style={styles.textarea} />
                    {formik.errors.description && <div style={styles.error}>{formik.errors.description}</div>}

                    <label style={styles.label}>Image URL</label>
                    <input name="image_url" type="text" onChange={formik.handleChange} value={formik.values.image_url} style={styles.input} />
                    {formik.errors.image_url && <div style={styles.error}>{formik.errors.image_url}</div>}

                    <label style={styles.label}>Link to Purchase</label>
                    <input name="link_to_purchase" type="text" onChange={formik.handleChange} value={formik.values.link_to_purchase} style={styles.input} />
                    {formik.errors.link_to_purchase && <div style={styles.error}>{formik.errors.link_to_purchase}</div>}

                    <label style={styles.label}>Skin Type</label>
                    <div style={styles.checkboxContainer}>
                        {skinTypeOptions.map((type) => (
                            <label key={type} style={styles.checkboxLabel}>
                                <input type="checkbox" name="skin_type" value={type} onChange={formik.handleChange} checked={formik.values.skin_type.includes(type)} />
                                {type}
                            </label>
                        ))}
                    </div>
                    {formik.errors.skin_type && <div style={styles.error}>{formik.errors.skin_type}</div>}

                    <button disabled={!formik.isValid} type="submit" style={styles.button}>
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    background: {
        backgroundImage: "url('/form-bg.jpg')", // ✅ Change this if needed
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    formContainer: {
        backgroundColor: "rgba(255, 255, 255, 0.8)", 
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        width: "40%",
        textAlign: "center",
    },
    title: {
        fontSize: "28px",
        fontWeight: "bold",
        fontFamily: "'Playfair Display', serif",
        marginBottom: "20px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    label: {
        fontWeight: "bold",
        textAlign: "left",
        fontFamily: "'Poppins', sans-serif",
    },
    input: {
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        fontSize: "16px",
    },
    textarea: {
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        fontSize: "16px",
        height: "100px",
    },
    checkboxContainer: {
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
    },
    checkboxLabel: {
        fontSize: "14px",
        fontFamily: "'Poppins', sans-serif",
    },
    button: {
        backgroundColor: "#ff7f50",
        color: "white",
        padding: "12px",
        border: "none",
        borderRadius: "5px",
        fontWeight: "bold",
        cursor: "pointer",
    },
    error: {
        color: "red",
        fontSize: "14px",
    }
};

export default SkinCareForm;
