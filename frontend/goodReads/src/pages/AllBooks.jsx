import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import Card from '../components/BookCard/Card';
import Loader from '../components/Loader/Loader';
import BooksContext from '../context/books';

export default function AllBooks() {
  const { books, loading } = useContext(BooksContext);
  if (loading) return <Loader />;

  return (
    <div>
      <h4 className='title' style={{marginTop:"20px" , fontSize:"40px"}}>All Books</h4>

      <div className="row">
        {books.length > 0 ? books.map((book) => (
          <Card key={book._id} book={book} />
        )) : <Loader />
        }
      </div>

    </div>
  )
}