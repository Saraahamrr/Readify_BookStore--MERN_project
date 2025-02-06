import React, { useState, useEffect } from 'react';
import axios from "axios";
import Card from '../components/BookCard/Card';
import Loader from '../components/Loader/Loader';

export default function AllBooks() {
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/books");
        setData(response.data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h4 className='title' style={{marginTop:"20px" , fontSize:"40px"}}>All Books</h4>

      <div className="row">
        {Data.length > 0 ? Data.map((book) => (
          <Card key={book._id} book={book} />
        )) : <Loader />
        }
      </div>

    </div>
  )
}