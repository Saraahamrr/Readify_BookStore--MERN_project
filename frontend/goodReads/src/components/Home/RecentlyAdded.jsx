import React, { useState, useEffect } from 'react';
import "./RecentlyAdded.css";
import axios from "axios";
import Card from '../BookCard/Card';
import Loader from '../Loader/Loader';

export default function RecentlyAdded() {
    const [Data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/books");
                setData(response.data); 
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className='recent'>
            <h4 className='title'>Popular Books</h4>

            <div className="row">
                {Data.length > 0 ? Data.map((book) => (
                    <Card key={book._id} book={book} /> 
                )) :  <Loader/> 
               }
            </div>
        </div>
    );
}
