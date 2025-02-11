import React, { createContext, useState, useEffect } from "react";
import axios from "axios";


const AuthorsContext = createContext();


export function AuthorsProvider({ children }) {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/authors");
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
        fetchAuthors();
    }, []);

    return (
        <AuthorsContext.Provider value={{ authors, setAuthors, loading }}>
            {children}  
        </AuthorsContext.Provider>
    );
}


export default AuthorsContext;
