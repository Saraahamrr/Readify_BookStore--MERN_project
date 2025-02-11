import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import Card from '../components/BookCard/Card';
import Loader from '../components/Loader/Loader';
import BooksContext from '../context/books';

export default function AllBooks() {
  const { books, loading } = useContext(BooksContext);
  if (loading) return <Loader />;
  useEffect(()=>{},[])

  return (
    <div className='d-flex flex-column align-items-center'>
      <h4 className='title' style={{marginTop:"20px" , fontSize:"40px"}}>All Books</h4>

      <div className="row d-flex align-items-center justify-content-center">
        {books.length > 0 ? books.map((book) => (
          <Card key={book._id} book={book} />
        )) : <Loader />
        }
      </div>

    </div>
  )
}