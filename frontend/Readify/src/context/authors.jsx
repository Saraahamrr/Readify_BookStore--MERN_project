import React, { createContext, useState, useEffect } from "react";
import axios from "axios";


const AuthorsContext = createContext();


export function AuthorsProvider({ children }) {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchAuthors = async () => {
        try {
            const response = await axios.get("https://readify.railway.internal/api/authors");
            console.log(response);
            const sortedAuthors = response.data.authors.sort((a, b) =>
                a.name.localeCompare(b.name)
              );
          
            setAuthors(
                sortedAuthors.map(author => ({
                  ...author,
                  dateOfBirth: author?.dateOfBirth?.split('T')[0]
                }))
              );           
            } catch (error) {
            console.error("Error fetching authors:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchAuthors();
    }, []);

    return (
        <AuthorsContext.Provider value={{ authors, setAuthors, loading,fetchAuthors }}>
            {children}  
        </AuthorsContext.Provider>
    );
}


export default AuthorsContext;
