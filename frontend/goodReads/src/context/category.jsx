import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const CategoryContext = createContext();

export function CategoryProvider({ children }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchCategories = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/categories");
            const sortedCategories = response.data.categories.sort((a, b) =>
                a.name.localeCompare(b.name)
              );
            setCategories(sortedCategories);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        
        fetchCategories();
    }, []);

    return (
        <CategoryContext.Provider value={{ categories, setCategories, loading,fetchCategories }}>
            {children}  
        </CategoryContext.Provider>
    );
}

export default CategoryContext;
