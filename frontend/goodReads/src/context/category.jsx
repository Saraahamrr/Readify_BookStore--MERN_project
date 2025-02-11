import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const CategoryContext = createContext();

export function CategoryProvider({ children }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/categories");
                setCategories(response.data.categories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    return (
        <CategoryContext.Provider value={{ categories, setCategories, loading }}>
            {children}  
        </CategoryContext.Provider>
    );
}

export default CategoryContext;
